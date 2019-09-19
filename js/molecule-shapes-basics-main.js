// Copyright 2014-2019, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const CanvasWarningNode = require( 'SCENERY_PHET/CanvasWarningNode' );
  const ColorProfile = require( 'SCENERY_PHET/ColorProfile' );
  const GlobalOptionsNode = require( 'MOLECULE_SHAPES/common/view/GlobalOptionsNode' );
  const IE11StencilWarningNode = require( 'SCENERY_PHET/IE11StencilWarningNode' );
  const ModelMoleculesScreen = require( 'MOLECULE_SHAPES/model/ModelMoleculesScreen' );
  const MoleculeShapesColorProfile = require( 'MOLECULE_SHAPES/common/view/MoleculeShapesColorProfile' );
  const MoleculeShapesGlobals = require( 'MOLECULE_SHAPES/common/MoleculeShapesGlobals' );
  const RealMoleculesScreen = require( 'MOLECULE_SHAPES/real/RealMoleculesScreen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  const moleculeShapesBasicsTitleString = require( 'string!MOLECULE_SHAPES_BASICS/molecule-shapes-basics.title' );

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

  SimLauncher.launch( function() {
    const sim = new Sim( moleculeShapesBasicsTitleString, [
      new ModelMoleculesScreen( isBasicsVersion ),
      new RealMoleculesScreen( isBasicsVersion )
    ], simOptions );
    sim.start();
  } );
} );
