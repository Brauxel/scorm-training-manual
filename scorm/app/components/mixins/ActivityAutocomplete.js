export default {
  activityDidRender() {
    if (this.state && this.state.get('isComplete')) return this;
    if (!this.complete || !this.contentState) return this;

    const setComplete = setTimeout(() => this.complete(), 200);
    if (this.contentState.get('isVisible')) setComplete();
    else this.listenTo(this.contentState, 'change:visible', setComplete);
  },
};
