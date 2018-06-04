import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import DailySchedule from './containers/dailySchedule'
import configureStore from "./store/configureStore";
import Notification from '../common/components/notification'

const store = configureStore();

render(
  <Provider store={store}>
    <div>
    <Notification />
    <DailySchedule />
    </div>
  </Provider>,
  document.getElementById("daily_schedule")
);
