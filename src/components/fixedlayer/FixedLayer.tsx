import React, { ReactElement, ReactNode } from "react";
import { createPortal } from "react-dom";

export type FixedLayerProps = {
    children: ReactNode | ReactElement
}

const root = typeof document !== `undefined` ? document.getElementById('portal') : null

const FixedLayer = ({ children }: FixedLayerProps) => {
    if (!root) return
    return createPortal(children, root
    )
};

export default FixedLayer;
