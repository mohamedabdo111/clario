type Listener = () => void;

const unauthorizedListeners = new Set<Listener>();

/**
 * Lets the data layer report an expired session (401) without depending on React.
 * The auth provider subscribes and signs the user out.
 */
export const sessionEvents = {
  onUnauthorized(listener: Listener) {
    unauthorizedListeners.add(listener);
    return () => {
      unauthorizedListeners.delete(listener);
    };
  },
  emitUnauthorized() {
    unauthorizedListeners.forEach((listener) => listener());
  },
};
