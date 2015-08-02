import { Dispatcher } from 'flux';
import _ from 'lodash';

var AppDispatcher = _.assign(new Dispatcher(), {});

export default AppDispatcher;
