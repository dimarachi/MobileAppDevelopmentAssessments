//Lets TypeScript import .png files as modules (e.g. import logoImg from './logo.png')
declare module '*.png' {
    const value: any;
    export default value;
}
