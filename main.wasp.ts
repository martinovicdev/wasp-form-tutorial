import { App } from 'wasp-config';

const app = new App('FormMaster', {
  title: 'FormMaster',
  wasp: { version: '^0.15.0' },
});

app.auth({
  userEntity: 'User',
  methods: {
    usernameAndPassword: {},
  },
  onAuthFailedRedirectTo: '/login',
});

const mainPage = app.page('MainPage', {
  authRequired: true,
  component: { import: 'MainPage', from: '@src/MainPage' },
});
app.route('RootRoute', { path: '/', to: mainPage });

const customerPage = app.page('CustomerPage', {
  authRequired: true,
  component: { import: 'CustomerPage', from: '@src/CustomerPage' },
});
app.route('CustomerRoute', { path: '/customer', to: customerPage });

const loginPage = app.page('LoginPage', {
  component: { import: 'LoginPage', from: '@src/auth/LoginPage' },
});
app.route('LoginRoute', { path: '/login', to: loginPage });

const signupPage = app.page('SignupPage', {
  component: { import: 'SignupPage', from: '@src/auth/SignupPage' },
});
app.route('SignupRoute', { path: '/signup', to: signupPage });

app.query('getCustomers', {
  fn: { import: 'getCustomers', from: '@src/customers/queries' },
  entities: ['Customer'],
});

app.query('getCustomer', {
  fn: { import: 'getCustomer', from: '@src/customers/queries' },
  entities: ['Customer'],
});

app.action('createCustomer', {
  fn: { import: 'createCustomer', from: '@src/customers/actions' },
  entities: ['Customer'],
});

app.action('updateCustomer', {
  fn: { import: 'updateCustomer', from: '@src/customers/actions' },
  entities: ['Customer'],
});

app.action('deleteCustomer', {
  fn: { import: 'deleteCustomer', from: '@src/customers/actions' },
  entities: ['Customer'],
});

export default app;
