export declare type TypeMessage = 'INFO' | 'SUCCESS' | 'ERR' | 'WARN';

export interface Message {
    type: TypeMessage,
    title: string,
    description: string,
    alignIsCenter: boolean,
    textButton?: string
}