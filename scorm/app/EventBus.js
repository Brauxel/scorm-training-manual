import { Events } from 'backbone';
import extend from 'lodash/object/extend';

const EventBus = extend({}, Events);

export default EventBus;
