# Two main ways of handling forms

## Template-driven

Setting up forms via component templates

- easy to get started
- implementing more complex logic & forms can be tricky

The idea here is that you set up your forms with help of the component templates and you register inputs with Angular so that it is aware of them with help of your templates, so directly in the templates.

## Reactive

Setting up forms via TS code

- setup requires more verbose code
- handling more complex forms can be easier

You set up your form structure in your TypeScript code and you then just link that to the template elements so that Angular knows which input element in the template is related to which control that was set up in the TypeScript code.
