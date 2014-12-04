//  Copyright 2002-2014, University of Colorado Boulder

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
  var MoleculeShapesGlobals = require( 'MOLECULE_SHAPES/common/MoleculeShapesGlobals' );
  var MoleculeShapesColors = require( 'MOLECULE_SHAPES/common/view/MoleculeShapesColors' );
  var GlobalOptionsNode = require( 'MOLECULE_SHAPES/common/view/GlobalOptionsNode' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var simTitle = require( 'string!MOLECULE_SHAPES/molecule-shapes-basics.name' );

  var isBasicsVersion = true;

  var simOptions = {
    credits: {
      leadDesign: 'Emily B. Moore',
      softwareDevelopment: 'Jonathan Olson',
      team: 'Julia Chamberlain, Kelly Lancaster, Ariel Paul, Kathy Perkins',
      qualityAssurance: 'Oliver Orejola, Bryan Yoelin'
    },
    optionsNode: new GlobalOptionsNode( isBasicsVersion )
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( window.phetcommon.getQueryParameter( 'dev' ) ) {
    simOptions = _.extend( {
      // add dev-specific options here
    }, simOptions );
  }

  // NOTE: ?webgl=false will trigger Canvas rendering with a reduced poly-count

  MoleculeShapesColors.applyProfile( 'basics' );

  MoleculeShapesGlobals.projectorColorsProperty.link( function( useProjectorColors ) {
    if ( useProjectorColors ) {
      MoleculeShapesColors.applyProfile( 'default' );
      MoleculeShapesColors.applyProfile( 'projector' );
    } else {
      MoleculeShapesColors.applyProfile( 'default' );
      MoleculeShapesColors.applyProfile( 'basics' );
    }
  } );

  SimLauncher.launch( function() {
    var sim = new Sim( simTitle, [
      new ModelMoleculesScreen( isBasicsVersion ),
      new RealMoleculesScreen( isBasicsVersion )
      ], simOptions );
    sim.start();
  } );
} );
