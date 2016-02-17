export default {

  defaultMiniDashboardProps: {
    instance: null,
  },

  getMiniDashboardContainer() {
    return this.$('.MiniDashboardContainer');
  },

  initialize({ miniDashboardProps }) {
    this.miniDashboardProps = {...this.defaultMiniDashboardProps, ...miniDashboardProps || {}};
  },

  render() {
    const { instance } = this.miniDashboardProps;
    if (instance) {
      this.getMiniDashboardContainer().html(instance.el);
      instance.render();
    }
    return this;
  },

};
