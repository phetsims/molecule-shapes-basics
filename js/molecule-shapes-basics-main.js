// Copyright 2014-2019, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasWarningNode = require( 'SCENERY_PHET/CanvasWarningNode' );
  var GlobalOptionsNode = require( 'MOLECULE_SHAPES/common/view/GlobalOptionsNode' );
  var IE11StencilWarningNode = require( 'SCENERY_PHET/IE11StencilWarningNode' );
  var ModelMoleculesScreen = require( 'MOLECULE_SHAPES/model/ModelMoleculesScreen' );
  var MoleculeShapesColorProfile = require( 'MOLECULE_SHAPES/common/view/MoleculeShapesColorProfile' );
  var MoleculeShapesGlobals = require( 'MOLECULE_SHAPES/common/MoleculeShapesGlobals' );
  var RealMoleculesScreen = require( 'MOLECULE_SHAPES/real/RealMoleculesScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var moleculeShapesBasicsTitleString = require( 'string!MOLECULE_SHAPES_BASICS/molecule-shapes-basics.title' );

  // constants
  var DEFAULT_COLOR_PROFILE_NAME = 'basics';
  
  var isBasicsVersion = true;

  var simOptions = {
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
      defaultColorProfileName: DEFAULT_COLOR_PROFILE_NAME // Projector Mode checkbox will toggle between 'projector' and 'basics' profiles
    } ),

    homeScreenWarningNode: MoleculeShapesGlobals.useWebGLProperty.get() ?
                           null :
                           ( MoleculeShapesGlobals.hasBasicWebGLSupportProperty.get() ?
                             new IE11StencilWarningNode() : // if we have basic support, we failed due to IE-specific reasons
                             new CanvasWarningNode() )
  };

  MoleculeShapesColorProfile.profileNameProperty.value = DEFAULT_COLOR_PROFILE_NAME;

  SimLauncher.launch( function() {
    var sim = new Sim( moleculeShapesBasicsTitleString, [
      new ModelMoleculesScreen( isBasicsVersion ),
      new RealMoleculesScreen( isBasicsVersion )
    ], simOptions );
    sim.start();
  } );
} );
