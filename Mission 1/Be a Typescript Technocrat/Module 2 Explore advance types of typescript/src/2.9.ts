{
  //
  // Conditional Types

  type a = null;
  type b = undefined;
  type c = void;

  type x = a extends null ? true : false;
  type y = a extends number ? true : b extends undefined ? true : false;

  //
}
