
// WTF Experiment

import { createStateEmitter } from 'app/util/state';

export default (state) => ({
  moduleProgress: (s => createStateEmitter(s, ['completedActivityIDs']))(state),
  isMobile: (s => createStateEmitter(s, ['isMobile']))(state),
  windowScrollY: (s => createStateEmitter(s, ['windowScrollY']))(state),
});
