/**
 * Copyright 2019 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const {
  conversation,
  Canvas,
  Simple
} = require('@assistant/conversation');
const functions = require('firebase-functions');
const {HtmlResponse} = require('actions-on-google');

const app = conversation({debug: true});
var page = 1

var fakeDB = {
  4: "C",
  5: "B",
  6: "B",
  7: "B",
}

app.handle('InitialIntent', (conv) => {
  page = 1
  // var topic = app.getArgument('topic');
  conv.add("Here's the lesson on " + conv.session.params.topic);
  conv.add(new Canvas({
    url: `https://oppiadeepintegration.web.app`,
    })
  );
});

app.handle('Continue', (conv) => {
  page = page+1;
  conv.add('continuing...')
  conv.add(new Canvas({
    data: {
      command: 'CONTINUE',
      pageNumber: page,
    },
  }))
})

app.handle('MC_ANSWER', (conv) => {
  // idea here is that we have a database with the correct answer for each page.
  // now we look up this page, check the answer and compare 
  // if (database.lookup(page).answer == answer) {trigger continue, page + 1}
  // else conv.add('That's incorrect, try again!')
  conv.add('you chose answer choice ' + conv.session.params.answer_choice)
  if (fakeDB[page] === conv.session.params.answer_choice) {
    page += 1
    conv.add("Good Job!")
  } else {
    conv.add("that's incorrect, try again!")
  }
  conv.add(new Canvas({
    data: {
      command: 'CONTINUE',
      pageNumber: page,
    }
  }))
})




exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);