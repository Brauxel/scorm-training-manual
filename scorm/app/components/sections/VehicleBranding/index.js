import Section from '../Section';
import template from './template.html';
import './style.styl';

const VehicleBranding = Section.extend({

  render() {
    this.el.innerHTML = template();

    this
      .registerActivities(this.getActivities(), this.getCompletedActivityIDs())
      .registerSummary({
        summaryContent: `
          <p>Good work on the vehicle branding and signage!</p>
          <p>For more information on ordering signage, ask your employer.</p>
          <p>Authorised Construction Partner personnel order stock for their crews via an online ordering portal provided by <span class="nbnMention">nbn</span>.</p>
          <p>Click ‘Continue’ to learn more simple things you can do to provide positive customer experience.</p>
        `,
      })
      .initShowable();

    return this;
  },

});

export default VehicleBranding;
