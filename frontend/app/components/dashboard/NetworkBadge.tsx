"use client";

import React from "react";
import { Shield, AlertTriangle, Rocket, Server, HelpCircle } from "lucide-react";
import { getNetworkConfig, type StellarNetwork } from "../../constants/networks";

/**
 * NetworkBadge Component
 * 
 * Displays a visual badge indicating the current Stellar network connection.
 * Applies network-specific colors, icons, and styling based on the network type.
 * 
 * Validates Requirements: 1.1, 1.3, 3.1, 3.2, 3.3, 3.4, 4.2, 9.1, 9.2, 9.3
 * 
 * @component
 */

/**
 * Props interface for NetworkBadge component
 */
export interface NetworkBadgeProps {
  /** The current Stellar network (MAINNET, TESTNET, FUTURENET, STANDALONE) */
  network: StellarNetwork;
  
  /** Click handler for badge interaction */
  onClick: () => void;
  
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Icon mapping for network types
 */
const NETWORK_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Shield,
  AlertTriangle,
  Rocket,
  Server,
  HelpCircle,
};

/**
 * NetworkBadge Component
 * 
 * Renders a clickable badge displaying the current network with appropriate
 * visual styling, icons, and responsive sizing.
 * 
 * Features:
 * - Network-specific colors and icons
 * - Responsive sizing (mobile/tablet/desktop)
 * - Warning indicators for non-mainnet networks
 * - Accessible with ARIA labels
 * - Keyboard navigable
 * 
 * @example
 * ```tsx
 * <NetworkBadge 
 *   network="MAINNET" 
 *   onClick={() => setShowModal(true)} 
 * />
 * ```
 */
export const NetworkBadge: React.FC<NetworkBadgeProps> = React.memo(
  ({ network, onClick, className = "" }) => {
    // Get network configuration
    const config = getNetworkConfig(network);
    
    // Get the appropriate icon component
    const IconComponent = NETWORK_ICONS[config.icon] || HelpCircle;
    
    // Build ARIA label for accessibility
    const ariaLabel = config.showWarning
      ? `Current network: ${config.displayName}. Warning: You are connected to a test network. Click to view network switching instructions.`
      : `Current network: ${config.displayName}. Click to view network switching instructions.`;
    
    return (
      <button
        role="button"
        aria-label={ariaLabel}
        aria-describedby={config.showWarning ? "testnet-warning" : undefined}
        onClick={onClick}
        className={`
          network-badge-responsive
          relative
          flex items-center justify-center
          border rounded-xl
          transition-all duration-200
          cursor-pointer
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          hover:opacity-90
          ${config.showWarning ? 'animate-pulse-subtle' : ''}
          ${className}
        `}
        style={{
          backgroundColor: config.colors.background,
          borderColor: config.colors.border,
          color: config.colors.primary, // This will color both text and icon
          // Mobile: icon only (32px x 32px) - overridden by media queries
          width: '32px',
          height: '32px',
          padding: '0',
          gap: '6px',
        }}
      >
        {/* Icon - always visible */}
        <IconComponent 
          size={14} 
          className="flex-shrink-0"
        />
        
        {/* Label - hidden on mobile, visible on tablet+ */}
        <span 
          className="hidden sm:inline text-xs font-semibold whitespace-nowrap"
          style={{ 
            color: config.colors.text,
            letterSpacing: '0.3px',
          }}
        >
          {config.displayName}
        </span>
        
        {/* Warning indicator for testnet - screen reader only */}
        {config.showWarning && (
          <span id="testnet-warning" className="sr-only">
            Warning: You are connected to the test network. Transactions will not affect real assets.
          </span>
        )}
        
        {/* Warning dot for mobile - visible only on small screens when warning is shown */}
        {config.showWarning && (
          <span
            className="absolute -top-0.5 -right-0.5 sm:hidden w-1.5 h-1.5 rounded-full border"
            style={{
              backgroundColor: config.colors.primary,
              borderColor: '#0e2330',
            }}
            aria-hidden="true"
          />
        )}
      </button>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if network changes
    return prevProps.network === nextProps.network;
  }
);

NetworkBadge.displayName = "NetworkBadge";

/**
 * Responsive sizing styles applied via Tailwind classes:
 * 
 * Mobile (<640px):
 * - Width: 32px, Height: 32px
 * - Icon only, no label
 * - Warning dot in top-right corner
 * 
 * Tablet (640px-1024px):
 * - Width: auto, Height: 36px
 * - Icon + abbreviated label
 * - Padding: 6px 12px
 * 
 * Desktop (>1024px):
 * - Width: auto, Height: 38px
 * - Icon + full label
 * - Padding: 8px 16px
 */

// Add custom styles for responsive sizing
const style = document.createElement('style');
style.textContent = `
  /* Tablet sizing */
  @media (min-width: 640px) {
    .network-badge-responsive {
      width: auto !important;
      height: 36px !important;
      padding: 0 12px !important;
    }
  }
  
  /* Desktop sizing */
  @media (min-width: 1024px) {
    .network-badge-responsive {
      height: 38px !important;
      padding: 0 16px !important;
    }
  }
  
  /* Subtle pulse animation for testnet warning */
  @keyframes pulse-subtle {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.85;
    }
  }
  
  .animate-pulse-subtle {
    animation: pulse-subtle 2s ease-in-out infinite;
  }
  
  /* Disable animations for users who prefer reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .animate-pulse-subtle {
      animation: none;
    }
  }
  
  /* Screen reader only utility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;

// Only add styles once
if (typeof document !== 'undefined' && !document.getElementById('network-badge-styles')) {
  style.id = 'network-badge-styles';
  document.head.appendChild(style);
}

export default NetworkBadge;
