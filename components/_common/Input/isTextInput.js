import TextInput from './TextInput';
import TextInputFormik from './TextInputFormik';

const isTextInput = (type) => type === TextInput || type === TextInputFormik;

export default isTextInput;
