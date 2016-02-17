import Activity from '../Activity';
import PanelGrid from 'app/components/PanelGrid';
import uniform from './uniform.jpg';
import uniformFull from './uniformFull.jpg';
import employeeCard from './employeeCard.png';
import callingCard from './callingCard.png';
import vehicle from './vehicle.png';
import vehicleFull from './vehicleFull.jpg';
import template from './template.html';
import './style.styl';

export default Activity.extend({
  className: 'BrandAttributes',

  defaultProps: {
    panels: [
      {
        key: 'uniform',
        title: 'Uniform, PPE and HSE items',
        caption: `
          <p>Your uniforms and PPE (Personal Protective Equipment) may have your employer’s company brand. Always ensure your clothing is clean and well kept.</p>
          <p>The hi-vis vests and hats supplied by <span class="nbnMention">nbn</span> will have the ‘Construction partner of’ branding. Wear those at all times over your uniforms.</p>
        `,
        figureThumbnail: uniform,
        figure: uniformFull,
      },
      {
        key: 'employeeCard',
        title: 'Employee ID Card and <span class="nbnMention">nbn</span>™ Accreditation Card',
        caption: `
          <div class="PanelGrid__panel__subHeading">Employee ID card</div>
          <p>This is a company-branded ID card which includes your photograph. Keep this with you at all times and present it when introducing yourself to members of the community or local residents.</p>
          <div class="PanelGrid__panel__subHeading"><span class="nbnMention">nbn</span>™ Accreditation Card</div>
          <p>This is an <span class="nbnMention">nbn</span>™ branded card that can be kept with you in person or stored as an app on your phone. It will keep track of the training you have completed and the accreditations you have obtained.</p>
        `,
        figure: employeeCard,
      },
      {
        key: 'callingCard',
        title: 'Calling cards',
        caption: `
          <p>These calling cards will display the <span class="nbnMention">nbn</span>™ brand and your employer company brand. Use these when knocking on the doors of homes in the areas where you are working. If the resident is not home, leave a calling card in their letterbox to notify them of the building works in their area.</p>
        `,
        figure: callingCard,
      },
      {
        key: 'vehicle',
        title: 'Vehicle branding and signage',
        caption: `
          <p>The vehicle branding and signage will display the <span class="nbnMention">nbn</span>™ brand. You will learn more about this later in the course.</p>
        `,
        figureThumbnail: vehicle,
        figure: vehicleFull,
      },
    ],
    isMobile: () => {},
  },

  renderActivityContent() {
    return template({...this.props});
  },

  activityDidRender() {
    this.panelGrid = new PanelGrid({
      panels: this.props.panels,
      isMobile: this.props.isMobile,
      onAllPanelsViewed: () => this.complete(),
    });

    this.el.querySelector('.BrandAttributes__panelGridContainer')
      .appendChild(this.panelGrid.el);

    this.panelGrid.render();
  },

});
