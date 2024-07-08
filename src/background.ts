import { defaults } from "./config";

// import browser from "webextension-polyfill";
console.log("Background script running...");

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");

  chrome.storage.local.get(Object.keys(defaults), (data) => {
    console.log("Got data", data);
  });

  chrome.storage.local.set(defaults);
});

chrome.runtime.onMessage.addListener((message) => {
  const { type, data } = message;

  switch (type) {
    case "UPDATE": {
      console.log("Got update message", data);
      chrome.storage.local.set(data);
    }
  }
});
