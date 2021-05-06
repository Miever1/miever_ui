import React, { useState } from 'react';

export enum Types {
    Sussess = 'success',
    Default = 'default',
    Danger = 'danger',
    Waring = 'waring'
}

interface IAlertPorps {
    styleType?: string,
}

const Alert: React.FunctionComponent<IAlertPorps> = props =>  {
    const [visible, setVisible] = useState(false);
    return (
        <div>

        </div>
    )
}

export default Alert;