import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import mermaid from 'mermaid';

// Initialize Mermaid once globally
let mermaidInitialized = false;
const initializeMermaid = () => {
  if (mermaidInitialized) return;
  
  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    darkMode: true,
    themeVariables: {
      primaryColor: '#06b6d4',
      primaryTextColor: '#ffffff',
      primaryBorderColor: '#0891b2',
      lineColor: '#06b6d4',
      sectionBkgColor: '#1f2937',
      altSectionBkgColor: '#374151',
      gridColor: '#374151',
      secondaryColor: '#1e40af',
      tertiaryColor: '#7c3aed',
      background: '#111827',
      mainBkg: '#1f2937',
      secondBkg: '#374151',
      tertiaryBkg: '#4b5563',
      textColor: '#ffffff',
      edgeLabelBackground: '#374151'
    },
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'cardinal'
    },
    logLevel: 'error',
    suppressErrorRendering: false
  });
  
  mermaidInitialized = true;
  console.log('🔧 Mermaid initialized globally');
};

// Cache for rendered diagrams to avoid re-rendering
const diagramCache = new Map();

// Mermaid component for rendering diagrams
const MermaidChart = ({ chart }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chart || !chartRef.current) return;

    // Create simple fallback immediately - no loading state
    const createFallback = () => {
      const fallbackContent = `
        <div class="bg-gradient-to-r from-gray-800 to-gray-700 border border-cyan-400/20 rounded-lg p-6 text-center">
          <div class="text-cyan-400 mb-3 text-lg">📊 Mermaid Diagram</div>
          <div class="text-gray-300 text-sm mb-4">Interactive flowchart available on GitHub repository</div>
          <details class="text-left bg-gray-900/50 rounded p-3">
            <summary class="text-cyan-400 text-sm cursor-pointer mb-2 hover:text-cyan-300 transition-colors">
              📄 View Diagram Source Code
            </summary>
            <pre class="text-gray-300 text-xs mt-3 overflow-auto max-h-48 border border-gray-600 rounded p-3 bg-black/30"><code>${chart.trim()}</code></pre>
          </details>
        </div>
      `;
      
      if (chartRef.current) {
        chartRef.current.innerHTML = fallbackContent;
      }
    };

    // Try to render with Mermaid, but fallback immediately if it fails
    const tryRender = async () => {
      try {
        // Create cache key
        const cacheKey = btoa(chart.trim()).substring(0, 32);
        
        // Check cache first
        if (diagramCache.has(cacheKey)) {
          chartRef.current.innerHTML = diagramCache.get(cacheKey);
          return;
        }

        // Initialize Mermaid
        initializeMermaid();
        
        // Try quick render with short timeout
        const id = `mermaid-${Date.now()}`;
        const renderPromise = mermaid.render(id, chart.trim());
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Quick timeout')), 1000)
        );
        
        const result = await Promise.race([renderPromise, timeoutPromise]);
        
        const svg = (typeof result === 'string') ? result : result?.svg;
        
        if (svg && chartRef.current) {
          chartRef.current.innerHTML = svg;
          diagramCache.set(cacheKey, svg);
          console.log('✅ Mermaid rendered quickly');
          return;
        }
        
        throw new Error('No SVG result');
        
      } catch (error) {
        console.log('📊 Mermaid fallback for:', chart.substring(0, 50) + '...');
        createFallback();
      }
    };

    // Execute render attempt
    tryRender();
    
  }, [chart]);

  return (
    <div 
      ref={chartRef}
      className="mermaid-chart bg-gray-800 border border-white/10 rounded-lg p-4 my-6 overflow-x-auto text-center"
      style={{ minHeight: '200px' }}
    />
  );
};

const ProjectDetails = ({ project, isOpen, onClose }) => {
  const [readmeContent, setReadmeContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [repoStats, setRepoStats] = useState(null);



  // Always fetch fresh data on project change
  // eslint-disable-next-line no-use-before-define
  useEffect(() => {
    if (!isOpen || !project) {
      return;
    }
    
    // Clear Mermaid cache periodically to prevent memory issues
    if (diagramCache.size > 20) {
      diagramCache.clear();
      console.log('🧹 Cleared Mermaid diagram cache');
    }
    
    // Reset state for new project
    setReadmeContent('');
    setRepoStats(null);
    setError('');
    
    if (project.github === '#' || !project.github) {
      // For projects without GitHub links, show fallback content
      const fallbackContent = `# ${project.title}\n\n${project.description}\n\n## Technologies Used\n\n${project.technologies?.map(tech => `- ${tech}`).join('\n') || ''}\n\n## About This Project\n\nThis project demonstrates modern development practices and showcases expertise in ${project.technologies?.join(', ') || 'various technologies'}.`;
      
      setReadmeContent(fallbackContent);
      setLoading(false);
      return;
    }
    
    // Always fetch fresh data
    console.log('🌐 Fetching fresh data for:', project.title);
    setLoading(true);
    fetchProjectDetails();
    
    // eslint-disable-next-line no-use-before-define
  }, [isOpen, project?.github, project?.id, fetchProjectDetails, project]); // Always fetch when these change

  const fetchProjectDetails = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      // Extract owner and repo from GitHub URL
      const githubUrl = project.github;
      const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
      
      if (!match) {
        throw new Error('Invalid GitHub URL');
      }

      const [, owner, repo] = match;
      
      // Fetch repository stats
      const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      if (repoResponse.ok) {
        const repoData = await repoResponse.json();
        setRepoStats(repoData);
      }

      // Fetch README content
      const readmeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
      
      if (readmeResponse.ok) {
        const readmeData = await readmeResponse.json();
        
        // Decode the base64 content properly
        let content;
        try {
          // First decode base64
          const base64Content = readmeData.content;
          const binaryString = atob(base64Content);
          
          // Convert binary string to Uint8Array
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          
          // Decode as UTF-8
          content = new TextDecoder('utf-8').decode(bytes);
        } catch (error) {
          console.warn('UTF-8 decode failed, trying fallback:', error);
          content = atob(readmeData.content);
        }
        
        // Get the default branch from repo data
        const defaultBranch = repoStats?.default_branch || 'main';
        
        // Convert relative image paths to absolute GitHub URLs
        content = content.replace(
          /!\[([^\]]*)\]\((?!https?:\/\/)(?!data:)([^)]+)\)/g,
          `![$$1](https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/$$2)`
        );
        
        // Handle ./ relative paths
        content = content.replace(
          /!\[([^\]]*)\]\(\.\/([^)]+)\)/g,
          `![$$1](https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/$$2)`
        );
        
        // Handle ../ relative paths  
        content = content.replace(
          /!\[([^\]]*)\]\(\.\.\/([^)]+)\)/g,
          `![$$1](https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/$$2)`
        );
        
        // Convert relative links to absolute GitHub URLs
        content = content.replace(
          /\[([^\]]+)\]\((?!https?:\/\/)(?!#)(?!mailto:)([^)]+)\)/g,
          `[$$1](https://github.com/${owner}/${repo}/blob/${defaultBranch}/$$2)`
        );
        
        // Fix encoding issues - these are common UTF-8 to Latin-1 mistranslations
        const encodingFixes = {
          // Common UTF-8 emoji characters that get garbled
          'â¡': '⚡',          // Lightning bolt
          'ð': '📁',           // Folder (primary)
          'ðð': '📁',          // Folder (alternative)
          'ð¦': '📦',          // Package
          'ð§': '🔧',          // Wrench  
          'ð¨': '🔨',          // Hammer
          'âï¸': '⚙️',         // Gear
          'ðrocket': '🚀',     // Rocket (avoiding dup)
          'ð»': '💻',          // Computer
          'ðbooks': '📚',      // Books (avoiding dup)
          'ð¡': '💡',          // Light bulb
          'ðconstruction': '🚧', // Construction (avoiding dup)
          'â ï¸': '⚠️',        // Warning
          'âï¸info': 'ℹ️',     // Info (avoiding dup)
          'â': '✅',           // Check mark
          'âx': '❌',          // X mark (avoiding dup)
          'ðmemo': '📝',       // Memo (avoiding dup)
          'ðchart': '📈',      // Chart (avoiding dup)
          'ðlock': '🔒',       // Lock (avoiding dup)
          'ðkey': '🔑',        // Key (avoiding dup)
          'ð¥': '🔥',          // Fire
          'ðgem': '💎',        // Gem (avoiding dup)
          'â­': '⭐',          // Star
          'ð¯': '🎯',          // Direct hit
          'ðglobe': '🌐',      // Globe (avoiding dup)
          'ðmag': '🔍',        // Magnifying glass (avoiding dup)
          'ðart': '🎨',        // Artist palette (avoiding dup)
          'ð¬speech': '💬',    // Speech balloon (avoiding dup)
          'â°': '⏰',          // Clock
          'ð¢': '🔢',          // Input numbers
          'ð±phone': '📱',     // Mobile phone (avoiding dup)
          'ðº': '📺',          // Television
          'ðheadphone': '🎧',  // Headphone (avoiding dup)
          'ð¤': '🤖',          // Robot
          'ðmicroscope': '🔬', // Microscope (avoiding dup)
          'ð¡ï¸': '🛡️',       // Shield
          'âbalance': '⚖️',    // Balance scale (avoiding dup)
          'ðuser': '👤',       // Bust in silhouette (avoiding dup)
          'ðusers': '👥',      // Busts in silhouette (avoiding dup)
          'ðbar_chart': '📊',  // Bar chart (avoiding dup)
          'ðlocked': '🔐',     // Closed lock with key (avoiding dup)
          'ðclipboard': '📋',  // Clipboard (avoiding dup)
          'ðdesktop': '🖥️',   // Desktop computer (avoiding dup)
          'ð±seedling': '🌱',  // Seedling (avoiding dup)
          'ðstar2': '🌟',      // Glowing star (avoiding dup)
          'â¨': '✨',          // Sparkles
        };

        // Apply encoding fixes
        Object.entries(encodingFixes).forEach(([garbled, correct]) => {
          content = content.replace(new RegExp(garbled.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), correct);
        });
        
        // Additional fallback for common Windows encoding issues
        content = content.replace(/Ã¢ÂÂ¡/g, '⚡');  // Lightning bolt - alternative encoding
        content = content.replace(/ðÂÂ/g, '📁');    // Folder - alternative encoding
        content = content.replace(/ðÂÂ¦/g, '📦');   // Package - alternative encoding
        
        // Clean up any remaining problematic sequences
        content = content.replace(/Â/g, '');  // Remove lone Â characters
        content = content.replace(/Ã/g, '');   // Remove lone Ã characters
        
        // Normalize whitespace and line endings
        content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        
        // Fix HTML entities
        content = content.replace(/&lt;/g, '<');
        content = content.replace(/&gt;/g, '>');
        content = content.replace(/&amp;/g, '&');
        content = content.replace(/&quot;/g, '"');
        content = content.replace(/&#39;/g, "'");
        
        // Fix emoji hex codes (both 4 and 6+ digit codes)
        content = content.replace(/&#x([0-9A-Fa-f]{4,6});/g, (match, hex) => {
          try {
            return String.fromCodePoint(parseInt(hex, 16));
          } catch (e) {
            return match;
          }
        });
        
        // Fix emoji decimal codes
        content = content.replace(/&#(\d{4,6});/g, (match, dec) => {
          try {
            return String.fromCodePoint(parseInt(dec, 10));
          } catch (e) {
            return match;
          }
        });
        
        // Fix Unicode escape sequences
        content = content.replace(/\\u([0-9A-Fa-f]{4})/g, (match, hex) => {
          try {
            return String.fromCharCode(parseInt(hex, 16));
          } catch (e) {
            return match;
          }
        });
        
        // Fix common emoji shortcodes
        const emojiShortcodes = {
          ':file_folder:': '📁',
          ':package:': '📦',
          ':wrench:': '🔧',
          ':hammer:': '🔨',
          ':gear:': '⚙️',
          ':rocket:': '🚀',
          ':computer:': '💻',
          ':books:': '📚',
          ':bulb:': '💡',
          ':construction:': '🚧',
          ':warning:': '⚠️',
          ':information_source:': 'ℹ️',
          ':heavy_check_mark:': '✅',
          ':x:': '❌',
          ':memo:': '📝',
          ':chart_with_upwards_trend:': '📈',
          ':lock:': '�',
          ':key:': '🔑',
          ':fire:': '🔥',
          ':gem:': '💎',
          ':star:': '⭐',
          ':dart:': '🎯',
          ':globe_with_meridians:': '🌐',
          ':mag:': '�',
          ':art:': '🎨'
        };
        
        Object.entries(emojiShortcodes).forEach(([shortcode, emoji]) => {
          content = content.replace(new RegExp(shortcode.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), emoji);
        });
        
        // Debug: Log sample of processed content
        console.log('Processed README content sample:', content.substring(0, 200));
        
        setReadmeContent(content);
        console.log('✅ README data loaded fresh for:', project.title);
        
      } else {
        const fallbackContent = `# ${project.title}\n\n${project.description}\n\n## Technologies Used\n\n${project.technologies?.map(tech => `- ${tech}`).join('\n') || ''}\n\n## About This Project\n\nThis project demonstrates modern development practices and showcases expertise in ${project.technologies?.join(', ') || 'various technologies'}.\n\n*README content could not be loaded from GitHub repository.*`;
        setReadmeContent(fallbackContent);
      }
    } catch (err) {
      setError('Failed to load project details');
      const errorContent = `# ${project.title}\n\n${project.description}\n\n## Technologies Used\n\n${project.technologies?.map(tech => `- ${tech}`).join('\n') || ''}`;
      setReadmeContent(errorContent);
    } finally {
      setLoading(false);
    }
  }, [project, repoStats?.default_branch]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-white/10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {project.title}
                  </h2>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  
                  {repoStats && (
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <FaStar className="text-yellow-400" />
                        <span>{repoStats.stargazers_count}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaCodeBranch className="text-cyan-400" />
                        <span>{repoStats.forks_count}</span>
                      </div>
                      <div className="text-gray-400">
                        {repoStats.language}
                      </div>
                    </div>
                  )}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                >
                  <FaTimes size={20} />
                </motion.button>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 rounded-full text-sm font-medium border border-cyan-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3 mt-6">
                <div className="flex flex-wrap gap-3">
                  {project.github && project.github !== "#" && project.github !== "" && (
                    <motion.a
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 25px rgba(75, 85, 99, 0.4)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-2 bg-gradient-to-r from-gray-700 to-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:from-gray-600 hover:to-gray-500 transition-all duration-300 shadow-lg hover:shadow-gray-500/25 cursor-pointer"
                      title={`View source code: ${project.github}`}
                    >
                      <FaGithub className="group-hover:rotate-12 transition-transform duration-300" />
                      <span className="group-hover:tracking-wide transition-all duration-300">💻 View Code</span>
                    </motion.a>
                  )}
                  
                  {project.demo && project.demo !== "#" && project.demo !== "" ? (
                    <motion.a
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 25px rgba(6, 182, 212, 0.4)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 cursor-pointer"
                      title={`Visit live demo: ${project.demo}`}
                    >
                      <FaExternalLinkAlt className="group-hover:rotate-12 transition-transform duration-300" />
                      <span className="group-hover:tracking-wide transition-all duration-300">🚀 Live Demo</span>
                    </motion.a>
                  ) : (
                    <div className="flex items-center space-x-2 bg-gray-800 text-gray-400 px-6 py-3 rounded-lg font-medium border border-gray-600">
                      <span className="text-gray-500">🚧</span>
                      <span>Live Demo Coming Soon</span>
                    </div>
                  )}
                </div>
                
                {/* Link Status Info */}
                <div className="text-xs text-gray-500 space-y-1">
                  {project.github && project.github !== "#" && project.github !== "" && (
                    <div>✅ Source code available</div>
                  )}
                  {project.demo && project.demo !== "#" && project.demo !== "" && (
                    <div>🌐 Live demo available</div>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[60vh] p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                  <span className="ml-3 text-gray-400">Fetching fresh data from GitHub...</span>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-400 mb-4">{error}</p>
                  <p className="text-gray-400">Showing basic project information instead.</p>
                </div>
              ) : null}
              
              <div className="prose prose-invert prose-cyan max-w-none markdown-body emoji-enhanced" style={{
                fontFeatureSettings: '"liga" 1, "kern" 1, "calt" 1',
                fontVariantEmoji: 'emoji',
                textRendering: 'optimizeLegibility'
              }}>
                <style dangerouslySetInnerHTML={{
                  __html: `
                    @font-face {
                      font-family: 'EmojiFont';
                      src: local('Apple Color Emoji'), local('Segoe UI Emoji'), local('Noto Color Emoji'), local('Twemoji Mozilla');
                      unicode-range: U+1F000-1F9FF, U+2600-26FF, U+2700-27BF;
                    }
                    
                    .emoji-enhanced {
                      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "EmojiOne", "Twemoji Mozilla" !important;
                      font-variant-emoji: emoji !important;
                      font-feature-settings: "liga" 1, "kern" 1, "calt" 1 !important;
                      text-rendering: optimizeLegibility !important;
                    }
                    
                    .emoji-enhanced * {
                      font-family: inherit !important;
                    }
                    
                    .markdown-body img {
                      max-width: 100% !important;
                      height: auto !important;
                    }
                    
                    .markdown-body pre {
                      white-space: pre-wrap !important;
                      word-break: break-word !important;
                    }
                    
                    .markdown-body code {
                      font-family: 'SFMono-Regular', 'Monaco', 'Inconsolata', 'Roboto Mono', Consolas, 'Courier New', monospace !important;
                    }
                    
                    .markdown-body pre code {
                      font-family: 'SFMono-Regular', 'Monaco', 'Inconsolata', 'Roboto Mono', Consolas, 'Courier New', monospace !important;
                    }
                    
                    .markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
                      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji" !important;
                      font-variant-emoji: emoji !important;
                      font-feature-settings: "liga" 1, "kern" 1 !important;
                    }
                    
                    .markdown-body p, .markdown-body li, .markdown-body td, .markdown-body th {
                      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji" !important;
                      font-variant-emoji: emoji !important;
                    }
                    
                    /* Ensure emojis render properly in all contexts */
                    .markdown-body [data-emoji], .markdown-body .emoji {
                      font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "EmojiOne", "Twemoji Mozilla" !important;
                      font-variant-emoji: emoji !important;
                      font-style: normal !important;
                      font-weight: normal !important;
                      text-decoration: none !important;
                    }
                    
                    /* Mermaid diagram styling */
                    .mermaid-chart {
                      text-align: center;
                      width: 100%;
                      display: block;
                    }
                    
                    .mermaid-chart svg {
                      max-width: 100% !important;
                      height: auto !important;
                      background-color: transparent !important;
                      display: block;
                      margin: 0 auto;
                    }
                    
                    .mermaid-chart .node rect,
                    .mermaid-chart .node circle,
                    .mermaid-chart .node ellipse,
                    .mermaid-chart .node polygon {
                      fill: #374151 !important;
                      stroke: #06b6d4 !important;
                      stroke-width: 2px !important;
                    }
                    
                    .mermaid-chart .edgeLabel {
                      background-color: #1f2937 !important;
                      color: #ffffff !important;
                    }
                    
                    .mermaid-chart .edgePath path {
                      stroke: #06b6d4 !important;
                      stroke-width: 2px !important;
                    }
                    
                    .mermaid-chart text {
                      fill: #ffffff !important;
                      font-family: Inter, system-ui, sans-serif !important;
                    }
                    
                    /* Image container styling */
                    .image-container {
                      text-align: center;
                    }
                    
                    .image-container img {
                      display: block;
                      margin: 0 auto;
                    }
                    
                    /* Center align images in div containers */
                    .markdown-body div[align="center"] {
                      text-align: center !important;
                    }
                    
                    .markdown-body div[align="center"] img {
                      display: inline-block !important;
                      margin: 10px !important;
                    }
                  `
                }} />
                <ReactMarkdown
                  key={`readme-${project?.id || 'default'}-${readmeContent.length}`}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  components={{
                    code: ({ node, inline, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || '');
                      const language = match && match[1];
                      
                      // Debug logging
                      console.log('Code block detected:', { language, className, hasChildren: !!children });
                      
                      // Handle Mermaid diagrams - check for multiple variations
                      if (language === 'mermaid' || className === 'language-mermaid') {
                        const chartCode = String(children).replace(/\n$/, '').trim();
                        console.log('🎯 Mermaid diagram detected:', chartCode.substring(0, 100) + '...');
                        return <MermaidChart chart={chartCode} />;
                      }

                      if (inline) {
                        return (
                          <code className="bg-gray-800 text-cyan-300 px-2 py-1 rounded text-sm font-mono" {...props}>
                            {children}
                          </code>
                        );
                      }
                      return (
                        <code className={`${className} text-gray-300`} {...props}>
                          {children}
                        </code>
                      );
                    },
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-white mb-4 border-b border-white/20 pb-2 emoji-enhanced" style={{ 
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji"',
                        fontVariantEmoji: 'emoji',
                        fontFeatureSettings: '"liga" 1, "kern" 1',
                        textRendering: 'optimizeLegibility'
                      }}>
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-semibold text-cyan-400 mb-3 mt-6 emoji-enhanced" style={{ 
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji"',
                        fontVariantEmoji: 'emoji',
                        fontFeatureSettings: '"liga" 1, "kern" 1',
                        textRendering: 'optimizeLegibility'
                      }}>
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold text-blue-400 mb-2 mt-4 emoji-enhanced" style={{ 
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji"',
                        fontVariantEmoji: 'emoji',
                        fontFeatureSettings: '"liga" 1, "kern" 1',
                        textRendering: 'optimizeLegibility'
                      }}>
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-lg font-semibold text-purple-400 mb-2 mt-3">
                        {children}
                      </h4>
                    ),
                    h5: ({ children }) => (
                      <h5 className="text-base font-semibold text-pink-400 mb-1 mt-2">
                        {children}
                      </h5>
                    ),
                    h6: ({ children }) => (
                      <h6 className="text-sm font-semibold text-indigo-400 mb-1 mt-2">
                        {children}
                      </h6>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-300 mb-4 leading-relaxed emoji-enhanced" style={{ 
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji"',
                        fontVariantEmoji: 'emoji',
                        fontFeatureSettings: '"liga" 1, "kern" 1',
                        textRendering: 'optimizeLegibility'
                      }}>
                        {children}
                      </p>
                    ),
                    pre: ({ children, ...props }) => {
                      // Check if this pre block contains a mermaid code block
                      const codeChild = React.Children.toArray(children).find(
                        child => child?.props?.className?.includes('language-mermaid')
                      );
                      
                      if (codeChild) {
                        const chartCode = String(codeChild.props.children).trim();
                        console.log('🎯 Mermaid in pre block detected:', chartCode.substring(0, 100) + '...');
                        return <MermaidChart chart={chartCode} />;
                      }
                      
                      return (
                        <pre className="bg-gray-800 border border-white/10 rounded-lg p-4 overflow-x-auto mb-4 text-sm" {...props}>
                          {children}
                        </pre>
                      );
                    },
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
                      >
                        {children}
                      </a>
                    ),
                    img: ({ src, alt, title }) => {
                      // Check if it's a badge/shield
                      const isBadge = src && (
                        src.includes('shields.io') || 
                        src.includes('badge') || 
                        src.includes('travis-ci') || 
                        src.includes('codecov') ||
                        src.includes('github.com/workflows') ||
                        alt?.toLowerCase().includes('badge') ||
                        alt?.toLowerCase().includes('shield')
                      );

                      if (isBadge) {
                        return (
                          <img
                            src={src}
                            alt={alt}
                            title={title}
                            className="inline-block mx-1 my-1 h-5 align-middle"
                            style={{ maxHeight: '20px', border: 'none', borderRadius: '4px' }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        );
                      }

                      // Handle relative paths more comprehensively
                      let imageSrc = src;
                      if (repoStats && src && !src.startsWith('http') && !src.startsWith('data:')) {
                        const owner = repoStats.owner?.login;
                        const repoName = repoStats.name;
                        const branch = repoStats.default_branch || 'main';
                        
                        if (src.startsWith('./')) {
                          imageSrc = `https://raw.githubusercontent.com/${owner}/${repoName}/${branch}/${src.substring(2)}`;
                        } else if (src.startsWith('../')) {
                          imageSrc = `https://raw.githubusercontent.com/${owner}/${repoName}/${branch}/${src}`;
                        } else if (!src.startsWith('/')) {
                          imageSrc = `https://raw.githubusercontent.com/${owner}/${repoName}/${branch}/${src}`;
                        } else {
                          imageSrc = `https://raw.githubusercontent.com/${owner}/${repoName}/${branch}${src}`;
                        }
                      }

                      return (
                        <div className="image-container my-4" key={`img-${project?.id || 'default'}-${src}`}>
                          <img
                            src={imageSrc}
                            alt={alt}
                            title={title}
                            className="max-w-full h-auto rounded-lg border border-white/10 shadow-lg block bg-gray-800 mx-auto"
                            style={{ maxHeight: '500px', objectFit: 'contain' }}
                            loading="lazy"
                            onError={(e) => {
                              console.log(`Image load failed: ${imageSrc}`);
                              
                              // Try multiple fallback URLs
                              const fallbacks = [];
                              if (repoStats) {
                                const owner = repoStats.owner?.login;
                                const repoName = repoStats.name;
                                
                                fallbacks.push(
                                  imageSrc.replace('/main/', '/master/'),
                                  imageSrc.replace('/master/', '/main/'),
                                  imageSrc.replace('/HEAD/', '/main/'),
                                  imageSrc.replace('/HEAD/', '/master/'),
                                  `https://github.com/${owner}/${repoName}/raw/main/${src}`,
                                  `https://github.com/${owner}/${repoName}/raw/master/${src}`,
                                );
                              }
                              
                              const tryNextFallback = () => {
                                if (fallbacks.length > 0 && e.target) {
                                  const nextSrc = fallbacks.shift();
                                  if (nextSrc !== e.target.src) {
                                    e.target.src = nextSrc;
                                    return;
                                  }
                                }
                                
                                // If all attempts fail, show a placeholder
                                if (e.target && e.target.parentNode) {
                                  e.target.outerHTML = `
                                    <div class="flex items-center justify-center h-32 bg-gray-800 border border-white/10 rounded-lg my-4 text-gray-400">
                                      <div class="text-center">
                                        <svg class="w-8 h-8 mx-auto mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        <p class="text-sm">${alt || 'Image could not be loaded'}</p>
                                        <p class="text-xs text-gray-600 mt-1 break-all">${src}</p>
                                      </div>
                                    </div>
                                  `;
                                }
                              };
                              
                              setTimeout(tryNextFallback, 100);
                            }}
                            onLoad={(e) => {
                              if (e.target) {
                                e.target.style.display = 'block';
                                console.log(`Image loaded successfully: ${e.target.src}`);
                              }
                            }}
                          />
                          {alt && (
                            <p className="text-center text-gray-400 text-sm mt-2 italic">
                              {alt}
                            </p>
                          )}
                        </div>
                      );
                    },
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4 ml-4">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-2 text-gray-300 mb-4 ml-4">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-gray-300 emoji-enhanced" style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji"',
                        fontVariantEmoji: 'emoji'
                      }}>{children}</li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-cyan-500 bg-gray-800/50 pl-4 py-2 my-4 rounded-r-lg">
                        {children}
                      </blockquote>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto mb-4">
                        <table className="w-full border-collapse border border-white/20 rounded-lg">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-white/20 bg-gray-800 px-4 py-2 text-left font-semibold text-cyan-400 emoji-enhanced" style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji"',
                        fontVariantEmoji: 'emoji'
                      }}>
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-white/20 px-4 py-2 text-gray-300 emoji-enhanced" style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji"',
                        fontVariantEmoji: 'emoji'
                      }}>
                        {children}
                      </td>
                    ),
                    hr: () => (
                      <hr className="border-white/20 my-6" />
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold text-white">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-gray-200">{children}</em>
                    ),
                    details: ({ children }) => (
                      <details className="bg-gray-800/50 border border-white/10 rounded-lg p-4 my-4">
                        {children}
                      </details>
                    ),
                    summary: ({ children }) => (
                      <summary className="cursor-pointer font-semibold text-cyan-400 mb-2 hover:text-cyan-300 transition-colors">
                        {children}
                      </summary>
                    ),
                    kbd: ({ children }) => (
                      <kbd className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs font-mono text-gray-300">
                        {children}
                      </kbd>
                    ),
                    del: ({ children }) => (
                      <del className="line-through text-gray-500">{children}</del>
                    ),
                    sup: ({ children }) => (
                      <sup className="text-xs text-cyan-400">{children}</sup>
                    ),
                    sub: ({ children }) => (
                      <sub className="text-xs text-cyan-400">{children}</sub>
                    ),
                    div: ({ node, children, align, ...props }) => {
                      // Handle center alignment for image galleries
                      if (align === 'center' || props['data-align'] === 'center') {
                        return (
                          <div className="text-center my-6" style={{ textAlign: 'center' }} {...props}>
                            <div className="flex flex-wrap justify-center items-center gap-4">
                              {children}
                            </div>
                          </div>
                        );
                      }
                      return <div {...props}>{children}</div>;
                    },
                  }}
                >
                  {readmeContent}
                </ReactMarkdown>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetails;