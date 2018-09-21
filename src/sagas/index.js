import { takeLatest } from "redux-saga";
import { fork } from "redux-saga/effects";
import { vendorsLoad } from "./vendors";

// main saga generators
export function* sagas() {
  yield [
    fork(takeLatest, 'VENDORS_LOAD', vendorsLoad)
  ];
}
