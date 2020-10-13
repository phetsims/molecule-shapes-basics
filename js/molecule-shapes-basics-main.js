// Copyright 2014-2020, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import MoleculeShapesGlobals from '../../molecule-shapes/js/common/MoleculeShapesGlobals.js';
import GlobalOptionsNode from '../../molecule-shapes/js/common/view/GlobalOptionsNode.js';
import MoleculeShapesColorProfile from '../../molecule-shapes/js/common/view/MoleculeShapesColorProfile.js';
import ModelMoleculesScreen from '../../molecule-shapes/js/model/ModelMoleculesScreen.js';
import RealMoleculesScreen from '../../molecule-shapes/js/real/RealMoleculesScreen.js';
import CanvasWarningNode from '../../scenery-phet/js/CanvasWarningNode.js';
import ColorProfile from '../../scenery-phet/js/ColorProfile.js';
import IE11StencilWarningNode from '../../scenery-phet/js/IE11StencilWarningNode.js';
import moleculeShapesBasicsStrings from './moleculeShapesBasicsStrings.js';

const moleculeShapesBasicsTitleString = moleculeShapesBasicsStrings[ 'molecule-shapes-basics' ].title;

// constants
const DEFAULT_COLOR_PROFILE_NAME = 'basics';

const isBasicsVersion = true;

const simOptions = {
  credits: {
    leadDesign: 'Emily B. Moore',
    softwareDevelopment: 'Jonathan Olson',
    team: 'Julia Chamberlain, Kelly Lancaster, Ariel Paul, Kathy Perkins',
    qualityAssurance: 'Oliver Orejola, Bryan Yoelin'
  },

  // NOTE: ?webgl=false will trigger Canvas rendering with a reduced poly-count
  webgl: true,

  // Creates content for the Options dialog
  createOptionsDialogContent: () => new GlobalOptionsNode( isBasicsVersion, {

    // Projector Mode checkbox will toggle between 'projector' and 'basics' profiles
    defaultColorProfileName: DEFAULT_COLOR_PROFILE_NAME
  } ),

  homeScreenWarningNode: MoleculeShapesGlobals.useWebGLProperty.get() ?
                         null :
                         ( MoleculeShapesGlobals.hasBasicWebGLSupportProperty.get() ?
                           new IE11StencilWarningNode() : // if we have basic support, we failed due to IE-specific reasons
                           new CanvasWarningNode() )
};

// Set the initial color profile, ignoring anything other than 'basics' or 'projector'.
if ( phet.chipper.queryParameters.colorProfile === ColorProfile.PROJECTOR_COLOR_PROFILE_NAME ) {
  MoleculeShapesColorProfile.profileNameProperty.value = phet.chipper.queryParameters.colorProfile;
}
else {
  MoleculeShapesColorProfile.profileNameProperty.value = DEFAULT_COLOR_PROFILE_NAME;
}

simLauncher.launch( () => {
  const sim = new Sim( moleculeShapesBasicsTitleString, [
    new ModelMoleculesScreen( isBasicsVersion ),
    new RealMoleculesScreen( isBasicsVersion )
  ], simOptions );
  sim.start();
} );