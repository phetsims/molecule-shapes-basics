// Copyright 2014-2015, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var ModelMoleculesScreen = require( 'MOLECULE_SHAPES/model/ModelMoleculesScreen' );
  var RealMoleculesScreen = require( 'MOLECULE_SHAPES/real/RealMoleculesScreen' );
  var MoleculeShapesColorProfile = require( 'MOLECULE_SHAPES/common/view/MoleculeShapesColorProfile' );
  var MoleculeShapesGlobals = require( 'MOLECULE_SHAPES/common/MoleculeShapesGlobals' );
  var GlobalOptionsNode = require( 'MOLECULE_SHAPES/common/view/GlobalOptionsNode' );
  var CanvasWarningNode = require( 'SCENERY_PHET/CanvasWarningNode' );
  var IE11StencilWarningNode = require( 'SCENERY_PHET/IE11StencilWarningNode' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var moleculeShapesBasicsTitleString = require( 'string!MOLECULE_SHAPES_BASICS/molecule-shapes-basics.title' );

  var isBasicsVersion = true;

  var simOptions = {
    credits: {
      leadDesign: 'Emily B. Moore',
      softwareDevelopment: 'Jonathan Olson',
      team: 'Julia Chamberlain, Kelly Lancaster, Ariel Paul, Kathy Perkins',
      qualityAssurance: 'Oliver Orejola, Bryan Yoelin'
    },
    optionsNode: new GlobalOptionsNode( isBasicsVersion ),
    homeScreenWarningNode: MoleculeShapesGlobals.useWebGL ?
                           null :
                           ( MoleculeShapesGlobals.hasBasicWebGLSupport ?
                             new IE11StencilWarningNode() : // if we have basic support, we failed due to IE-specific reasons
                             new CanvasWarningNode() )
  };

  // NOTE: ?webgl=false will trigger Canvas rendering with a reduced poly-count

  MoleculeShapesColorProfile.profileNameProperty.set( 'basics' );

  MoleculeShapesGlobals.projectorColorsProperty.link( function( useProjectorColors ) {
    if ( useProjectorColors ) {
      MoleculeShapesColorProfile.profileNameProperty.set( 'default' );
      MoleculeShapesColorProfile.profileNameProperty.set( 'projector' );
    }
    else {
      MoleculeShapesColorProfile.profileNameProperty.set( 'default' );
      MoleculeShapesColorProfile.profileNameProperty.set( 'basics' );
    }
  } );

  SimLauncher.launch( function() {
    var sim = new Sim( moleculeShapesBasicsTitleString, [
      new ModelMoleculesScreen( isBasicsVersion ),
      new RealMoleculesScreen( isBasicsVersion )
    ], simOptions );
    sim.start();
  } );
} );
