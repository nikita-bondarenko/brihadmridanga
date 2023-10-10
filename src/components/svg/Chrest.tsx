import React from 'react';
import {stack} from "../../hooks/useClassName";


type ChrestProps = {
    className: string
}
const Chrest = ({className}: ChrestProps) => {
    return (
        <svg className={stack(className)} xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path d="M12.0446 34.4444L9.55566 31.9555L19.5112 22L9.55566 12.0444L12.0446 9.55554L22.0001 19.5111L31.9557 9.55554L34.4446 12.0444L24.489 22L34.4446 31.9555L31.9557 34.4444L22.0001 24.4889L12.0446 34.4444Z" fill="black"/>
        </svg>
    );
};

export default Chrest;