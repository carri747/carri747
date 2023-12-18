import { Given, When, Then } from '@wdio/cucumber-framework';
import * as chai from 'chai';

Given(/^I am on the (\w+) page$/, async (page) => {
    await chai.expect(false).to.be.true;
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {});

Then(/^I should see a flash message saying (.*)$/, async (message) => {});
