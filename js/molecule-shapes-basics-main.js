// Copyright 2014-2022, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import PreferencesModel from '../../joist/js/preferences/PreferencesModel.js';
import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import MoleculeShapesGlobals from '../../molecule-shapes/js/common/MoleculeShapesGlobals.js';
import GeneralPreferencesContentNode from '../../molecule-shapes/js/common/view/GeneralPreferencesContentNode.js';
import ModelMoleculesScreen from '../../molecule-shapes/js/model/ModelMoleculesScreen.js';
import RealMoleculesScreen from '../../molecule-shapes/js/real/RealMoleculesScreen.js';
import CanvasWarningNode from '../../scenery-phet/js/CanvasWarningNode.js';
import Tandem from '../../tandem/js/Tandem.js';
import moleculeShapesBasicsStrings from './moleculeShapesBasicsStrings.js';

const moleculeShapesBasicsTitleString = moleculeShapesBasicsStrings[ 'molecule-shapes-basics' ].title;

const isBasicsVersion = true;

// Basics version has no content for general tab, don't include an empty Node (which adds an extra separator in the
// dialog).
const generalCustomPreferences = isBasicsVersion ? [] : [
  {

    // Creates content for the General tab in preferences.
    createContent: tandem => new GeneralPreferencesContentNode( isBasicsVersion, tandem.createTandem( 'simPreferences' ) )
  }
];

const simOptions = {
  credits: {
    leadDesign: 'Emily B. Moore',
    softwareDevelopment: 'Jonathan Olson',
    team: 'Julia Chamberlain, Kelly Lancaster, Ariel Paul, Kathy Perkins, Amy Rouinfar',
    qualityAssurance: 'Steele Dalton, Bryce Griebenow, Clifford Hardin, Brooklyn Lash, Emily Miller, Elise Morgan, Oliver Orejola, Jacob Romero, Nancy Salpepi, Kathryn Woessner, Bryan Yoelin'
  },

  // NOTE: ?webgl=false will trigger Canvas rendering with a reduced poly-count
  webgl: true,

  preferencesModel: new PreferencesModel( {
    generalOptions: {
      customPreferences: generalCustomPreferences
    },
    visualOptions: {
      supportsProjectorMode: true
    }
  } ),

  homeScreenWarningNode: MoleculeShapesGlobals.useWebGLProperty.get() ?
                         null :
                         new CanvasWarningNode()
};

simLauncher.launch( () => {
  const sim = new Sim( moleculeShapesBasicsTitleString, [
    new ModelMoleculesScreen( isBasicsVersion, Tandem.ROOT.createTandem( 'modelScreen' ) ),
    new RealMoleculesScreen( isBasicsVersion, Tandem.ROOT.createTandem( 'realMoleculesScreen' ) )
  ], simOptions );
  sim.start();
} );
