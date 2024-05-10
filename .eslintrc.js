module.exports = {
  root: true,
  extends: ['@react-native', 'prettier', 'prettier/react'],
  plugins: 'prettier',
  rules: {'prettier/prettier': ['error', {endOfLine: 'auto'}]},
};
