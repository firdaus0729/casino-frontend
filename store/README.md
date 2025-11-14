# Redux Store Implementation

This project now uses Redux Toolkit for global state management, specifically for handling loading states.

## 🏗️ **Architecture Overview**

```
store/
├── index.ts              # Main store configuration
├── provider.tsx          # Redux Provider component
├── hooks.ts              # Custom hooks for Redux usage
├── slices/
│   └── loadingSlice.ts   # Loading state management
└── README.md             # This documentation
```

## 🔧 **Store Setup**

### **Store Configuration** (`store/index.ts`)

- Configures Redux store with loading reducer
- Exports TypeScript types for state and dispatch

### **Redux Provider** (`store/provider.tsx`)

- Wraps the app with Redux Provider
- Enables Redux state throughout the application

### **Custom Hooks** (`store/hooks.ts`)

- `useAppDispatch`: Typed dispatch function
- `useAppSelector`: Typed selector function

## 📊 **Loading State Management**

### **Loading Slice** (`store/slices/loadingSlice.ts`)

The loading slice manages two key states:

```typescript
interface LoadingState {
  isLoading: boolean // Current loading state
  isInitialLoad: boolean // Whether this is the first app load
}
```

### **Actions Available**

1. **`setLoading(boolean)`**
   - Sets the current loading state
   - Used for manual loading control

2. **`setInitialLoadComplete()`**
   - Marks initial app load as complete
   - Sets both `isLoading` and `isInitialLoad` to `false`

3. **`resetLoadingState()`**
   - Resets to initial state
   - Useful for development/testing

## 🚀 **How It Works**

### **Page Refresh (F5)**

1. ✅ **State Resets**: Redux state resets to initial values
2. ✅ **Loading Shows**: `isLoading: true`, `isInitialLoad: true`
3. ✅ **Timer Starts**: 1.5 second loading screen
4. ✅ **State Updates**: `setInitialLoadComplete()` called

### **Page Navigation**

1. ✅ **State Persists**: Redux state remains intact
2. ✅ **No Loading**: `isLoading: false`, `isInitialLoad: false`
3. ✅ **Instant Transition**: No loading screen shown
4. ✅ **Smooth UX**: Fast page changes

## 🎯 **Key Benefits**

### **vs localStorage Approach**

- ❌ **localStorage**: Persists across browser sessions
- ✅ **Redux State**: Resets on page refresh (F5)

### **vs Context API**

- ❌ **Context**: Re-renders all consumers on state change
- ✅ **Redux**: Efficient updates, minimal re-renders

### **vs useState**

- ❌ **useState**: Local to component, doesn't persist
- ✅ **Redux**: Global state, persists during navigation

## 🔄 **Usage Examples**

### **In Components**

```typescript
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setLoading } from '@/store/slices/loadingSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.loading);

  const handleStartLoading = () => {
    dispatch(setLoading(true));
  };

  return (
    <div>
      {isLoading ? 'Loading...' : 'Content'}
      <div onClick={handleStartLoading}>Start Loading</div>
    </div>
  );
}
```

### **In Components (Direct Redux Usage)**

```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setInitialLoadComplete } from '@/store/slices/loadingSlice';

export default function LayoutContent({ children }) {
  const dispatch = useAppDispatch();
  const { isLoading, isInitialLoad } = useAppSelector((state) => state.loading);

  useEffect(() => {
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        dispatch(setInitialLoadComplete());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isInitialLoad, dispatch]);

  if (isLoading) {
    return <PageLoader message="Loading app..." />;
  }

  return <>{children}</>;
}
```

## 🧪 **Testing**

Use the `ReduxLoadingTest` component to verify functionality:

```typescript
import ReduxLoadingTest from '@/components/examples/ReduxLoadingTest';

// Add to any page to test loading states
<ReduxLoadingTest />
```

## 📱 **Integration Points**

### **Updated Components**

- ✅ `LayoutContent`: Direct Redux state access with initial load logic
- ✅ `app/page.tsx`: Uses Redux loading state for progress bar
- ✅ `app/layout.tsx`: Wrapped with Redux Provider
- ✅ `app/test-loading/page.tsx`: Test page for loading functionality

### **Removed Dependencies**

- ❌ `LoadingProvider`: Replaced with direct Redux usage
- ❌ `NavigationProvider`: No longer needed
- ❌ `localStorage.getItem('app-has-loaded')`
- ❌ `localStorage.setItem('app-has-loaded', 'true')`
- ❌ `localStorage.removeItem('app-has-loaded')`

## 🔮 **Future Enhancements**

The Redux store is designed to be easily extensible:

1. **Add More Slices**: User preferences, theme, notifications
2. **Persist State**: Use `redux-persist` for specific states
3. **DevTools**: Enable Redux DevTools for debugging
4. **Middleware**: Add logging, analytics, or async actions

## 🚨 **Important Notes**

1. **State Reset**: Redux state resets on page refresh (F5)
2. **Navigation Persistence**: State persists during page navigation
3. **Initial Load**: Always shows loading screen on first visit
4. **Performance**: Efficient updates with minimal re-renders
5. **TypeScript**: Full type safety with custom hooks

## 📚 **Resources**

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Redux Hooks](https://react-redux.js.org/api/hooks)
- [Next.js with Redux](https://nextjs.org/docs/with-redux)
