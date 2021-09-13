import TextInput, { TextInputFormik } from './TextInput';

const isTextInput = (type) => type === TextInput || type === TextInputFormik;

export default isTextInput;
