import TextInput, { TextInputFormik } from './TextInput';
import TransparentTextInput, {
  TransparentTextInputFormik,
} from './TransparentTextInput';

const isTextInput = (type) =>
  type === TextInput ||
  type === TextInputFormik ||
  type === TransparentTextInput ||
  type === TransparentTextInputFormik;

export default isTextInput;
