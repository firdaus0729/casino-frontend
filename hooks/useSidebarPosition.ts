import { useSidebar } from '@/context/SidebarProvider'

/**
 * Custom hook to get the correct left position for floating components
 * that should follow the sidebar edge
 * @returns Object with left position and sidebar state
 */
export function useSidebarPosition() {
  const { isCollapsed } = useSidebar()

  // Calculate left position based on sidebar state
  const leftPosition = isCollapsed ? '80px' : '248px'

  return {
    leftPosition,
    isCollapsed,
    // Helper function to get position with custom values
    getPosition: (
      collapsedValue: string = '80px',
      expandedValue: string = '315px'
    ) => (isCollapsed ? collapsedValue : expandedValue),
  }
}
