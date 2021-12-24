import SearchTextInput, { SearchTextInputFormik } from './SearchTextInput';
import TextInput, { TextInputFormik } from './TextInput';
import TransparentTextInput, {
  TransparentTextInputFormik,
} from './TransparentTextInput';

const isTextInput = (type) =>
  type === TextInput ||
  type === SearchTextInput ||
  type === TextInputFormik ||
  type === TransparentTextInput ||
  type === SearchTextInputFormik ||
  type === TransparentTextInputFormik;

export default isTextInput;
