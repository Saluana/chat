// A tiny global gate to coordinate when each message's content is fully ready
// Usage: const { isReady, markReady, reset } = useRenderGate()

export function useRenderGate() {
  const state = useState<Record<string, boolean>>('render-gate', () => ({}));

  function markReady(id: string) {
    if (!id) return;
    state.value[id] = true;
  }

  function reset(id: string) {
    if (!id) return;
    state.value[id] = false;
  }

  function isReady(id: string | undefined | null) {
    if (!id) return false;
    return !!state.value[id];
    }

  return { isReady, markReady, reset };
}
