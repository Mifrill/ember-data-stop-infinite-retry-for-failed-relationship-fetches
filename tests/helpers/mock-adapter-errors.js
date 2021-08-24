import Ember from 'ember';

const { Test, Logger } = Ember;

export default function mockAdapterErrors(hooks = self) {
  hooks.beforeEach(function() {
    interceptExceptions.call(this);
  });

  hooks.afterEach(function() {
    restoreExceptions.call(this);
  });
}

export function interceptExceptions() {
  this.originalLoggerError = Logger.error;
  this.originalTestAdapterException = Test.adapter.exception;
  this.originalOnError = Ember.onerror;
  Logger.error = () => {};
  Test.adapter.exception = () => {};
  Ember.onerror = () => {};
}

export function restoreExceptions() {
  Logger.error = this.originalLoggerError;
  Test.adapter.exception = this.originalTestAdapterException;
  Ember.onerror = this.originalOnError;
}
