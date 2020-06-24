import { useEffect } from 'react'

//useEffect once, circumvent eslint warning react-hooks/exhaustive-deps
export const useMountEffect = (f) => useEffect(f, [])