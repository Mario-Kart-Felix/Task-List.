/********************************************
 * An example repression model using CRIPSR *
 * Encoded in SBOL using the sboljs library *
 * Written by Zach Zundel                   *
 ********************************************/

let SBOLDocument = require('sboljs');
let filesystem = require('fs');
let createUri = require('./lib/createUri');
let cdTypes = require('./lib/componentDefinitionTypes');
let so = require('./lib/sequenceOntology');
let sbo = require('./lib/systemsBiologyOntology');
let encodings = require('./lib/encodings');

// Create the document
let document = new SBOLDocument();

// Set up namespaces


// Set some constants
let uriPrefix = "http://sbols.org/CRISPR_Example/";
let version = "1.0.0";

/*******************************************
 * First, let's create the generic circuit *
 *******************************************/

// Add top-level Component Definitions
let cas9_generic_cd = document.componentDefinition(createUri(uriPrefix, 'cas9_generic', version));
let grna_generic_cd = document.componentDefinition(createUri(uriPrefix, "gRNA_generic", version));
let cas9_grna_complex_cd = document.componentDefinition(createUri(uriPrefix, "cas9_gRNA_complex", version));
let target_gene_cd = document.componentDefinition(createUri(uriPrefix, "target_gene", version));
let target_cd = document.componentDefinition(createUri(uriPrefix, "target", version));

// Add Display IDs to component definitions
cas9_generic_cd.displayId = "cas9_generic";
grna_generic_cd.displayId = "gRNA_generic";
cas9_grna_complex_cd.displayId = "cas9_gRNA_complex";
target_gene_cd.displayId = "target_gene";
target_cd.displayId = "target";

// Add persistent identities to component definitions
cas9_generic_cd.persistentIdentity = createUri(uriPrefix, "cas9_generic");
grna_generic_cd.persistentIdentity = createUri(uriPrefix, "gRNA_generic");
cas9_grna_complex_cd.persistentIdentity = createUri(uriPrefix, "cas9_gRNA_complex");
target_gene_cd.persistentIdentity = createUri(uriPrefix, "target_gene");
target_cd.persistentIdentity = createUri(uriPrefix, "target");

// Add versions to component definitions
cas9_generic_cd.version = version;
grna_generic_cd.version = version;
cas9_grna_complex_cd.version = version;
target_gene_cd.version = version;
target_cd.version = version;

// Add types to component definitions
cas9_generic_cd.addType(cdTypes.PROTEIN);
grna_generic_cd.addType(cdTypes.RNA);
cas9_grna_complex_cd.addType(cdTypes.COMPLEX);
target_gene_cd.addType(cdTypes.DNA);
target_cd.addType(cdTypes.PROTEIN);

// Add roles to component definitions
grna_generic_cd.addRole(so.SGRNA);
target_gene_cd.addRole(so.PROMOTER);

// Add top-level module definition
let crispr_template_module = document.moduleDefinition(createUri(uriPrefix, "CRISPR_Template", version));

// Add module definition display ID
crispr_template_module.displayId = "CRISPR_Template";

// Add module definition persistent identity
crispr_template_module.persistentIdentity = createUri(uriPrefix, "CRISPR_Template");

// Add module definition version
crispr_template_module.version = version;

// Add module definition information 
crispr_template_module.addStringAnnotation('http://purl.org/dc/terms/title', "CRISPR-based Repression Template");
crispr_template_module.addStringAnnotation('http://purl.org/dc/terms/description', "Authors: S. Kiani, J. Beal, M. Ebrahimkhani, J. Huh, R. Hall, Z. Xie, Y. Li, and R. WeissTitel: Crispr transcriptional repression devices and layered circuits in mammalian cellsJournal: Nature Methods, vol. 11, no. 7, pp. 723–726, 2014.");

// Create functional components for component definitions
let cas9_generic_fc = document.functionalComponent(createUri(uriPrefix, "CRISPR_Template/cas9_generic", version));
let grna_generic_fc = document.functionalComponent(createUri(uriPrefix, "CRISPR_Template/gRNA_generic", version));
let cas9_grna_complex_fc = document.functionalComponent(createUri(uriPrefix, "CRISPR_Template/cas9_gRNA_complex", version));
let target_gene_fc = document.functionalComponent(createUri(uriPrefix, "CRISPR_Template/target_gene", version));
let target_fc = document.functionalComponent(createUri(uriPrefix, "CRISPR_Template/target", version));

// Add display IDs to functional components
cas9_generic_fc.displayId = "cas9_generic";
grna_generic_fc.displayId = "gRNA_generic";
cas9_grna_complex_fc.displayId = "cas9_gRNA_complex";
target_gene_fc.displayId = "target_gene";
target_fc.displayId = "target";

// Add persistent identities to function components
cas9_generic_fc.persistentIdentity = createUri(uriPrefix, "CRISPR_Template/cas9_generic");
grna_generic_fc.persistentIdentity = createUri(uriPrefix, "CRISPR_Template/gRNA_generic");
cas9_grna_complex_fc.persistentIdentity = createUri(uriPrefix, "CRISPR_Template/cas9_gRNA_complex");
target_gene_fc.persistentIdentity = createUri(uriPrefix, "CRISPR_Template/target_gene");
target_fc.persistentIdentity = createUri(uriPrefix, "CRISPR_Template/target");

// Add versions to functional components
cas9_generic_fc.version = version;
grna_generic_fc.version = version;
cas9_grna_complex_fc.version = version;
target_gene_fc.version = version;
target_fc.version = version;

// Point functional components to their component definitions
cas9_generic_fc.definition = cas9_generic_cd.persistentIdentity;
grna_generic_fc.definition = grna_generic_cd.persistentIdentity;
cas9_grna_complex_fc.definition = cas9_grna_complex_cd.persistentIdentity;
target_gene_fc.definition = target_gene_cd.persistentIdentity;
target_fc.definition = target_cd.persistentIdentity;

// Add functional components to module definition for CRISPR template
crispr_template_module.addFunctionalComponent(cas9_generic_fc);
crispr_template_module.addFunctionalComponent(grna_generic_fc);
crispr_template_module.addFunctionalComponent(cas9_grna_complex_fc);
crispr_template_module.addFunctionalComponent(target_gene_fc);
crispr_template_module.addFunctionalComponent(target_fc);

// Create complex formation reaction
let cas9complex_formation_interaction = document.interaction(createUri(uriPrefix, "CRISPR_Template/cas9_complex_formation", version));

// Add complex formation reaction display ID
cas9complex_formation_interaction.displayId = "cas9_complex_formation";

// Add complex formation reaction persistent identity
cas9complex_formation_interaction.persistentIdentity = createUri(uriPrefix, "CRISPR_Template/cas9_complex_formation");

// Add complex formation version
cas9complex_formation_interaction.version = version;

// Add type to complex formation interaction
cas9complex_formation_interaction.addType(sbo.NON_COVALENT_BINDING);

// Create complex formation interaction participations
let cas9_generic_participation = document.participation(createUri(uriPrefix, "CRISPR_Template/cas9_complex_formation/cas9_generic", version));
let grna_generic_participation = document.participation(createUri(uriPrefix, "CRISPR_Template/cas9_complex_formation/gRNA_generic", version));
let cas9_grna_complex_participation = document.participation(createUri(uriPrefix, "CRISPR_Template/cas9_complex_formation/cas9_gRNA_complex", version));

// Add complex formation interaction participations display IDs
cas9_generic_participation.displayId = "cas9_generic";
grna_generic_participation.displayId = "gRNA_generic";
cas9_grna_complex_participation.displayId = "cas9_gRNA_complex";

// Add complex formation interaction participations persistent identity
cas9_generic_participation.persistentIdentity = createUri(uriPrefix, "CRISPR_Template/cas9_complex_formation/cas9_generic");
grna_generic_participation.persistentIdentity = createUri(uriPrefix, "CRISPR_Template/cas9_complex_formation/gRNA_generic");
cas9_grna_complex_participation.persistentIdentity = createUri(uriPrefix, "CRISPR_Template/cas9_complex_formation/cas9_gRNA_complex");

// Add complex formation interaction participations version
cas9_generic_participation.version = version;
grna_generic_participation.version = version;
cas9_grna_complex_participation.version = version;

// Point complex formation interaction participants to their functional components
cas9_generic_participation.participant = cas9_generic_fc;
grna_generic_participation.participant = grna_generic_fc;
cas9_grna_complex_participation.participant = cas9_grna_complex_fc;

// Add participant roles for complex formation
cas9_generic_participation.addRole(sbo.REACTANT);
grna_generic_participation.addRole(sbo.REACTANT);
cas9_grna_complex_participation.addRole(sbo.PRODUCT);

// Add participants to complex formation interaction
cas9complex_formation_interaction.addParticipation(cas9_generic_participation);
cas9complex_formation_interaction.addParticipation(grna_generic_participation);
cas9complex_formation_interaction.addParticipation(cas9_grna_complex_participation);

// Create target production interaction
let eyfp_production_interaction = document.interaction(createUri(uriPrefix, "CRISPR_Template/target_production", version));

// Add target production interation display ID
eyfp_production_interaction.displayId = "target_production";

// Add target production reaction persistent identity
eyfp_production_interaction.persistentIdentity = createUri(uriPrefix, "CRISPR_Template/target_production");

// Add target production version
eyfp_production_interaction.version = version;

// Add type to target production interaction
eyfp_production_interaction.addType(sbo.GENETIC_PRODUCTION);

// Create target production interaction participations
let target_gene_participation = document.participation(createUri(uriPrefix, "CRISPR_Template/target_production/target_gene", version));
let target_participation = document.participation(createUri(uriPrefix, "CRISPR_Template/target_production/target", version));

// Add target production interaction participations display IDs
target_gene_participation.displayId = "target_gene";
target_participation.displayId = "target";

// Add target production interaction participations persistent identity
target_gene_participation.persistentIdentity = createUri(uriPrefix, "CRISPR_Template/target_production/target_gene");
target_participation.persistentIdentity = createUri(uriPrefix, "CRISPR_Template/target_production/target");

// Add target production interaction participations version
target_gene_participation.version = version;
target_participation.version = version;

// Point target production interaction participants to their functional components
target_gene_participation.participant = target_gene_fc;
target_participation.participant = target_fc;

// Add participant roles for target production
target_gene_participation.addRole(sbo.PROMOTER);
target_participation.addRole(sbo.PRODUCT);

// Add participants to target production interaction
eyfp_production_interaction.addParticipation(target_gene_participation);
eyfp_production_interaction.addParticipation(target_participation);

// Create inhibition of target production interaction
let target_gene_inhibition_interaction = document.interaction(createUri(uriPrefix, "CRISPR_Template/target_gene_inhibition", version));

// Add inhibition of target production reaction display ID
target_gene_inhibition_interaction.displayId = "target_gene_inhibition";

// Add inhibition of target production reaction persistent identity
target_gene_inhibition_interaction.persistentIdentity = createUri(uriPrefix, "CRISPR_Template/target_gene_inhibition");

// Add inhibition of target production version
target_gene_inhibition_interaction.version = version;

// Add type to inhibition of target production interaction
target_gene_inhibition_interaction.addType(sbo.INHIBITION);

// Create inhibition interaction participations
let cas9_grna_complex_participation_1 = document.participation(createUri(uriPrefix, "CRISPR_Template/target_gene_inhibition/cas9_gRNA_complex", version));
let target_gene_participation_1 = document.participation(createUri(uriPrefix, "CRISPR_Template/target_gene_inhibition/target_gene", version));

// Add inhibition interaction participations display IDs
cas9_grna_complex_participation_1.displayId = "cas9_gRNA_complex";
target_gene_participation_1.displayId = "target_gene";

// Add inhibition formation interaction participations persistent identity
cas9_grna_complex_participation_1.persistentIdentity = createUri(uriPrefix, "CRISPR_Template/target_gene_inhibition/cas9_gRNA_complex");
target_gene_participation_1.persistentIdentity = createUri(uriPrefix, "CRISPR_Template/target_gene_inhibition/target_gene");

// Add inhibition formation interaction participations version
cas9_grna_complex_participation_1.version = version;
target_gene_participation_1.version = version;

// Point inhibition interaction participations to their functional components
cas9_grna_complex_participation_1.participant = cas9_grna_complex_fc;
target_gene_participation_1.participant = target_gene_fc;

// Add participation roles for inhibition interaction
cas9_grna_complex_participation_1.addRole(sbo.INHIBITOR);
target_gene_participation_1.addRole(sbo.PROMOTER);

// Add participations to target inhibition interaction
target_gene_inhibition_interaction.addParticipation(cas9_grna_complex_participation_1);
target_gene_inhibition_interaction.addParticipation(target_gene_participation_1);

// Add interactions to module
crispr_template_module.addInteraction(cas9complex_formation_interaction);
crispr_template_module.addInteraction(eyfp_production_interaction);
crispr_template_module.addInteraction(target_gene_inhibition_interaction);

/**************************************
 * Next, the characterization circuit *
 **************************************/


// Create component definitions for the characterization circuit
let pconst_cd = document.componentDefinition(createUri(uriPrefix, "pConst", version));
let cas9m_bfp_cds_cd = document.componentDefinition(createUri(uriPrefix, "cas9m_BFP_cds", version));
let cas9m_bfp_gene_cd = document.componentDefinition(createUri(uriPrefix, "cas9m_BFP_gene", version));
let cas9m_bfp_cd = document.componentDefinition(createUri(uriPrefix, "cas9m_BFP", version));
let cra_u6_cd = document.componentDefinition(createUri(uriPrefix, "CRa_U6", version));
let grna_b_nc_cd = document.componentDefinition(createUri(uriPrefix, "gRNA_b_nc", version));
let grna_b_terminator_cd = document.componentDefinition(createUri(uriPrefix, "gRNA_b_terminator", version));
let grna_b_gene_cd = document.componentDefinition(createUri(uriPrefix, "gRNA_b_gene", version));
let grna_b_cd = document.componentDefinition(createUri(uriPrefix, "gRNA_b", version));
let cas9m_bfp_grna_b_cd = document.componentDefinition(createUri(uriPrefix, "cas9m_BFP_gRNA_b", version));
let mkate_cds_cd = document.componentDefinition(createUri(uriPrefix, "mKate_cds", version));
let mkate_gene_cd = document.componentDefinition(createUri(uriPrefix, "mKate_gene", version));
let mkate_cd = document.componentDefinition(createUri(uriPrefix, "mKate", version));
let gal4vp16_cds_cd = document.componentDefinition(createUri(uriPrefix, "Gal4VP16_cds", version));
let gal4vp16_gene_cd = document.componentDefinition(createUri(uriPrefix, "Gal4VP16_gene", version));
let gal4vp16_cd = document.componentDefinition(createUri(uriPrefix, "Gal4VP16", version));
let crp_b_cd = document.componentDefinition(createUri(uriPrefix, "CRP_b", version));
let eyfp_cds_cd = document.componentDefinition(createUri(uriPrefix, "EYFP_cds", version));
let eyfp_gene_cd = document.componentDefinition(createUri(uriPrefix, "EYFP_gene", version));
let eyfp_cd = document.componentDefinition(createUri(uriPrefix, "EYFP", version));

// Set the component definition displayIds
pconst_cd.displayId = "pConst";
cas9m_bfp_cds_cd.displayId = "cas9m_BFP_cds";
cas9m_bfp_gene_cd.displayId = "cas9m_BFP_gene";
cas9m_bfp_cd.displayId = "cas9m_BFP";
cra_u6_cd.displayId = "CRa_U6";
grna_b_nc_cd.displayId = "gRNA_b_nc";
grna_b_terminator_cd.displayId = "gRNA_b_terminator";
grna_b_gene_cd.displayId = "gRNA_b_gene";
grna_b_cd.displayId = "gRNA_b";
cas9m_bfp_grna_b_cd.displayId = "cas9m_BFP_gRNA_b";
mkate_cds_cd.displayId = "mKate_cds";
mkate_gene_cd.displayId = "mKate_gene";
mkate_cd.displayId = "mKate";
gal4vp16_cds_cd.displayId = "Gal4VP16_cds";
gal4vp16_gene_cd.displayId = "Gal4VP16_gene";
gal4vp16_cd.displayId = "Gal4VP16";
crp_b_cd.displayId = "CRP_b";
eyfp_cds_cd.displayId = "EYFP_cds";
eyfp_gene_cd.displayId = "EYFP_gene";
eyfp_cd.displayId = "EYFP";

// Set the component definition persistent identities
pconst_cd.persistentIdentity = createUri(uriPrefix, "pConst");
cas9m_bfp_cds_cd.persistentIdentity = createUri(uriPrefix, "cas9m_BFP_cds");
cas9m_bfp_gene_cd.persistentIdentity = createUri(uriPrefix, "cas9m_BFP_gene");
cas9m_bfp_cd.persistentIdentity = createUri(uriPrefix, "cas9m_BFP");
cra_u6_cd.persistentIdentity = createUri(uriPrefix, "CRa_U6");
grna_b_nc_cd.persistentIdentity = createUri(uriPrefix, "gRNA_b_nc");
grna_b_terminator_cd.persistentIdentity = createUri(uriPrefix, "gRNA_b_terminator");
grna_b_gene_cd.persistentIdentity = createUri(uriPrefix, "gRNA_b_gene");
grna_b_cd.persistentIdentity = createUri(uriPrefix, "gRNA_b");
cas9m_bfp_grna_b_cd.persistentIdentity = createUri(uriPrefix, "cas9m_BFP_gRNA_b");
mkate_cds_cd.persistentIdentity = createUri(uriPrefix, "mKate_cds");
mkate_gene_cd.persistentIdentity = createUri(uriPrefix, "mKate_gene");
mkate_cd.persistentIdentity = createUri(uriPrefix, "mKate");
gal4vp16_cds_cd.persistentIdentity = createUri(uriPrefix, "Gal4VP16_cds");
gal4vp16_gene_cd.persistentIdentity = createUri(uriPrefix, "Gal4VP16_gene");
gal4vp16_cd.persistentIdentity = createUri(uriPrefix, "Gal4VP16");
crp_b_cd.persistentIdentity = createUri(uriPrefix, "CRP_b");
eyfp_cds_cd.persistentIdentity = createUri(uriPrefix, "EYFP_cds");
eyfp_gene_cd.persistentIdentity = createUri(uriPrefix, "EYFP_gene");
eyfp_cd.persistentIdentity = createUri(uriPrefix, "EYFP");

// Set the component definition versions
pconst_cd.version = version;
cas9m_bfp_cds_cd.version = version;
cas9m_bfp_gene_cd.version = version;
cas9m_bfp_cd.version = version;
cra_u6_cd.version = version;
grna_b_nc_cd.version = version;
grna_b_terminator_cd.version = version;
grna_b_gene_cd.version = version;
grna_b_cd.version = version;
cas9m_bfp_grna_b_cd.version = version;
mkate_cds_cd.version = version;
mkate_gene_cd.version = version;
mkate_cd.version = version;
gal4vp16_cds_cd.version = version;
gal4vp16_gene_cd.version = version;
gal4vp16_cd.version = version;
crp_b_cd.version = version;
eyfp_cds_cd.version = version;
eyfp_gene_cd.version = version;
eyfp_cd.version = version;

// Set the component definition types
pconst_cd.addType(cdTypes.DNA);
cas9m_bfp_cds_cd.addType(cdTypes.DNA);
cas9m_bfp_gene_cd.addType(cdTypes.DNA);
cas9m_bfp_cd.addType(cdTypes.PROTEIN);
cra_u6_cd.addType(cdTypes.DNA);
grna_b_nc_cd.addType(cdTypes.DNA);
grna_b_terminator_cd.addType(cdTypes.DNA);
grna_b_gene_cd.addType(cdTypes.DNA);
grna_b_cd.addType(cdTypes.RNA);
cas9m_bfp_grna_b_cd.addType(cdTypes.COMPLEX);
mkate_cds_cd.addType(cdTypes.DNA);
mkate_gene_cd.addType(cdTypes.DNA);
mkate_cd.addType(cdTypes.PROTEIN);
gal4vp16_cds_cd.addType(cdTypes.DNA);
gal4vp16_gene_cd.addType(cdTypes.DNA);
gal4vp16_cd.addType(cdTypes.PROTEIN);
crp_b_cd.addType(cdTypes.DNA);
eyfp_cds_cd.addType(cdTypes.DNA);
eyfp_gene_cd.addType(cdTypes.DNA);
eyfp_cd.addType(cdTypes.PROTEIN);

// Set the component definition roles
pconst_cd.addRole(so.PROMOTER);
cas9m_bfp_cds_cd.addRole(so.CDS);
cas9m_bfp_gene_cd.addRole(so.PROMOTER);
cra_u6_cd.addRole(so.PROMOTER);
grna_b_nc_cd.addRole(so.CDS);
grna_b_terminator_cd.addRole(so.TERMINATOR);
grna_b_gene_cd.addRole(so.PROMOTER);
grna_b_cd.addRole(so.SGRNA);
mkate_cds_cd.addRole(so.CDS);
mkate_gene_cd.addRole(so.PROMOTER);
gal4vp16_cds_cd.addRole(so.CDS);
gal4vp16_gene_cd.addRole(so.PROMOTER);
crp_b_cd.addRole(so.PROMOTER);
eyfp_cds_cd.addRole(so.CDS);
eyfp_gene_cd.addRole(so.PROMOTER);

// Define the sequence strings
let cra_u6_seq_elements = "GGTTTACCGAGCTCTTATTGGTTTTCAAACTTCATTGACTGTGCC" +
                          "AAGGTCGGGCAGGAAGAGGGCCTATTTCCCATGATTCCTTCATAT" +
                          "TTGCATATACGATACAAGGCTGTTAGAGAGATAATTAGAATTAAT" +
                          "TTGACTGTAAACACAAAGATATTAGTACAAAATACGTGACGTAGA" +
                          "AAGTAATAATTTCTTGGGTAGTTTGCAGTTTTAAAATTATGTTTT" +
                          "AAAATGGACTATCATATGCTTACCGTAACTTGAAATATAGAACCG" +
                          "ATCCTCCCATTGGTATATATTATAGAACCGATCCTCCCATTGGCT" +
                          "TGTGGAAAGGACGAAACACCGTACCTCATCAGGAACATGTGTTTA" +
                          "AGAGCTATGCTGGAAACAGCAGAAATAGCAAGTTTAAATAAGGCT" +
                          "AGTCCGTTATCAACTTGAAAAAGTGGCACCGAGTCGGTGCTTTTT" +
                          "TTGGTGCGTTTTTATGCTTGTAGTATTGTATAATGTTTTT";

let grna_b_elements = "AAGGTCGGGCAGGAAGAGGGCCTATTTCCCATGATTCCTTCATAT" +
                      "TTGCATATACGATACAAGGCTGTTAGAGAGATAATTAGAATTAAT" +
                      "TTGACTGTAAACACAAAGATATTAGTACAAAATACGTGACGTAGA" +
                      "AAGTAATAATTTCTTGGGTAGTTTGCAGTTTTAAAATTATGTTTT" +
                      "AAAATGGACTATCATATGCTTACCGTAACTTGAAAGTATTTCGAT" +
                      "TTCTTGGCTTTATATATCTTGTGGAAAGGACGAAACACCGTACCT" +
                      "CATCAGGAACATGTGTTTAAGAGCTATGCTGGAAACAGCAGAAAT" +
                      "AGCAAGTTTAAATAAGGCTAGTCCGTTATCAACTTGAAAAAGTGG" +
                      "CACCGAGTCGGTGCTTTTTTT";

let mkate_seq_elements = "TCTAAGGGCGAAGAGCTGATTAAGGAGAACATGCACATGAAGCTG" +
                         "TACATGGAGGGCACCGTGAACAACCACCACTTCAAGTGCACATCC" +
                         "GAGGGCGAAGGCAAGCCCTACGAGGGCACCCAGACCATGAGAATC" +
                         "AAGGTGGTCGAGGGCGGCCCTCTCCCCTTCGCCTTCGACATCCTG" +
                         "GCTACCAGCTTCATGTACGGCAGCAAAACCTTCATCAACCACACC" +
                         "CAGGGCATCCCCGACTTCTTTAAGCAGTCCTTCCCTGAGGTAAGT" +
                         "GGTCCTACCTCATCAGGAACATGTGTTTTAGAGCTAGAAATAGCA" +
                         "AGTTAAAATAAGGCTAGTCCGTTATCAACTTGAAAAAGTGGCACC" +
                         "GAGTCGGTGCTACTAACTCTCGAGTCTTCTTTTTTTTTTTCACAG" +
                         "GGCTTCACATGGGAGAGAGTCACCACATACGAAGACGGGGGCGTG" +
                         "CTGACCGCTACCCAGGACACCAGCCTCCAGGACGGCTGCCTCATC" +
                         "TACAACGTCAAGATCAGAGGGGTGAACTTCCCATCCAACGGCCCT" +
                         "GTGATGCAGAAGAAAACACTCGGCTGGGAGGCCTCCACCGAGATG" +
                         "CTGTACCCCGCTGACGGCGGCCTGGAAGGCAGAAGCGACATGGCC" +
                         "CTGAAGCTCGTGGGCGGGGGCCACCTGATCTGCAACTTGAAGACC" +
                         "ACATACAGATCCAAGAAACCCGCTAAGAACCTCAAGATGCCCGGC" +
                         "GTCTACTATGTGGACAGAAGACTGGAAAGAATCAAGGAGGCCGAC" +
                         "AAAGAGACCTACGTCGAGCAGCACGAGGTGGCTGTGGCCAGATAC" +
                         "TGCG";


let crp_b_seq_elements = "GCTCCGAATTTCTCGACAGATCTCATGTGATTACGCCAAGCTACG" +
                         "GGCGGAGTACTGTCCTCCGAGCGGAGTACTGTCCTCCGAGCGGAG" +
                         "TACTGTCCTCCGAGCGGAGTACTGTCCTCCGAGCGGAGTTCTGTC" +
                         "CTCCGAGCGGAGACTCTAGATACCTCATCAGGAACATGTTGGAAT" +
                         "TCTAGGCGTGTACGGTGGGAGGCCTATATAAGCAGAGCTCGTTTA" +
                         "GTGAACCGTCAGATCGCCTCGAGTACCTCATCAGGAACATGTTGG" +
                         "ATCCAATTCGACC";

// Create the sequences
let cra_u6_seq_sequence = document.sequence(createUri(uriPrefix, "CRa_U6_seq", version));
let grna_b_seq_sequence = document.sequence(createUri(uriPrefix, "gRNA_b_seq", version))
let mkate_seq_sequence = document.sequence(createUri(uriPrefix, "mKate_seq", version));
let crp_b_seq_sequence = document.sequence(createUri(uriPrefix, "CRP_b_seq", version));

// Set the sequence display IDs
cra_u6_seq_sequence.displayId = "CRa_U6_seq";
grna_b_seq_sequence.displayId = "gRNA_b_seq";
mkate_seq_sequence.displayId = "mKate_seq";
crp_b_seq_sequence.displayId = "CRP_b_seq";

// Set the sequence persistentIdentities
cra_u6_seq_sequence.persistentIdentity = createUri(uriPrefix, "CRa_U6_seq");
grna_b_seq_sequence.persistentIdentity = createUri(uriPrefix, "gRNA_b_seq");
mkate_seq_sequence.persistentIdentity = createUri(uriPrefix, "mKate_seq");
crp_b_seq_sequence.persistentIdentity = createUri(uriPrefix, "CRP_b_seq");

// Set the sequence display IDs
cra_u6_seq_sequence.version = version;
grna_b_seq_sequence.version = version;
mkate_seq_sequence.version = version;
crp_b_seq_sequence.version = version;

// Set the sequence elements
cra_u6_seq_sequence.elements = cra_u6_seq_elements;
grna_b_seq_sequence.elements = grna_b_elements;
mkate_seq_sequence.elements = mkate_seq_elements;
crp_b_seq_sequence.elements = crp_b_seq_elements;

// Set the sequence encodings
cra_u6_seq_sequence.encoding = encodings.IUPAC_DNA;
grna_b_seq_sequence.encoding = encodings.IUPAC_DNA;
mkate_seq_sequence.encoding = encodings.IUPAC_DNA;
crp_b_seq_sequence.encoding = encodings.IUPAC_DNA;

// Add the sequences to their component definitions
cra_u6_cd.addSequence(cra_u6_seq_sequence.persistentIdentity);
grna_b_nc_cd.addSequence(grna_b_seq_sequence.persistentIdentity);
mkate_cds_cd.addSequence(mkate_seq_sequence.persistentIdentity);
crp_b_cd.addSequence(crp_b_seq_sequence.persistentIdentity);

// Create components for gene parts
let mkate_pconst_component = document.component(createUri(uriPrefix, 'mKate_gene/pConst', version));
let mkate_mkate_cds_component = document.component(createUri(uriPrefix, "mKate_gene/mKate_cds", version));
let cas9m_bfp_pconst_component = document.component(createUri(uriPrefix, "cas9m_BFP_gene/pConst", version));
let cas9m_bfp_cas9m_bfp_cds_component = document.component(createUri(uriPrefix, "cas9m_BFP_gene/cas9m_BFP_cds", version));
let gal4vp16_pconst_component = document.component(createUri(uriPrefix, "Gal4VP16_gene/pConst", version));
let gal4vp16_gal4vp16_cds_component = document.component(createUri(uriPrefix, "Gal4VP16_gene/Gal4VP16_cds", version));
let eyfp_eyfp_cds_component = document.component(createUri(uriPrefix, "EYFP_gene/EYFP_cds", version));
let eyfp_crp_b_component = document.component(createUri(uriPrefix, "EYFP_gene/CRP_b", version));
let grna_b_grna_b_terminator_component = document.component(createUri(uriPrefix, "gRNA_b_gene/gRNA_b_terminator", version));
let grna_b_cra_u6_component = document.component(createUri(uriPrefix, "gRNA_b_gene/CRa_U6", version));
let grna_b_grna_b_nc_component = document.component(createUri(uriPrefix, "gRNA_b_gene/gRNA_b_nc", version));

// Set component display IDs
mkate_pconst_component.displayId = 'pConst';
mkate_mkate_cds_component.displayId = "mKate_cds";
cas9m_bfp_pconst_component.displayId = "pConst";
cas9m_bfp_cas9m_bfp_cds_component.displayId = "cas9m_BFP_cds";
gal4vp16_pconst_component.displayId = "pConst";
gal4vp16_gal4vp16_cds_component.displayId = "Gal4VP16_cds";
eyfp_eyfp_cds_component.displayId = "EYFP_cds";
eyfp_crp_b_component.displayId = "CRP_b";
grna_b_grna_b_terminator_component.displayId = "gRNA_b_terminator";
grna_b_cra_u6_component.displayId = "CRa_U6";
grna_b_grna_b_nc_component.displayId = "gRNA_b_nc";

// set component persistent identities
mkate_pconst_component.persistentIdentity = createUri(uriPrefix, 'mKate_gene/pConst');
mkate_mkate_cds_component.persistentIdentity = createUri(uriPrefix, "mKate_gene/mKate_cds");
cas9m_bfp_pconst_component.persistentIdentity = createUri(uriPrefix, "cas9m_BFP_gene/pConst");
cas9m_bfp_cas9m_bfp_cds_component.persistentIdentity = createUri(uriPrefix, "cas9m_BFP_gene/cas9m_BFP_cds");
gal4vp16_pconst_component.persistentIdentity = createUri(uriPrefix, "Gal4VP16_gene/pConst");
gal4vp16_gal4vp16_cds_component.persistentIdentity = createUri(uriPrefix, "Gal4VP16_gene/Gal4VP16_cds");
eyfp_eyfp_cds_component.persistentIdentity = createUri(uriPrefix, "EYFP_gene/EYFP_cds");
eyfp_crp_b_component.persistentIdentity = createUri(uriPrefix, "EYFP_gene/CRP_b");
grna_b_grna_b_terminator_component.persistentIdentity = createUri(uriPrefix, "gRNA_b_gene/gRNA_b_terminator");
grna_b_cra_u6_component.persistentIdentity = createUri(uriPrefix, "gRNA_b_gene/CRa_U6");
grna_b_grna_b_nc_component.persistentIdentity = createUri(uriPrefix, "gRNA_b_gene/gRNA_b_nc");

// Set component versions
mkate_pconst_component.version = version;
mkate_mkate_cds_component.version = version;
cas9m_bfp_pconst_component.version = version;
cas9m_bfp_cas9m_bfp_cds_component.version = version;
gal4vp16_pconst_component.version = version;
gal4vp16_gal4vp16_cds_component.version = version;
eyfp_eyfp_cds_component.version = version;
eyfp_crp_b_component.version = version;
grna_b_grna_b_terminator_component.version = version;
grna_b_cra_u6_component.version = version;
grna_b_grna_b_nc_component.version = version;

// Point components to their definitions
mkate_pconst_component.definition = pconst_cd.persistentIdentity;
mkate_mkate_cds_component.definition = mkate_cds_cd.persistentIdentity;
cas9m_bfp_pconst_component.definition = pconst_cd.persistentIdentity;
cas9m_bfp_cas9m_bfp_cds_component.definition = cas9m_bfp_cds_cd.persistentIdentity;
gal4vp16_pconst_component.definition = pconst_cd.persistentIdentity;
gal4vp16_gal4vp16_cds_component.definition = gal4vp16_cds_cd.persistentIdentity;
eyfp_eyfp_cds_component.definition = eyfp_cds_cd.persistentIdentity;
eyfp_crp_b_component.definition = crp_b_cd.persistentIdentity;
grna_b_grna_b_terminator_component.definition = grna_b_terminator_cd.persistentIdentity;
grna_b_cra_u6_component.definition = cra_u6_cd.persistentIdentity;
grna_b_grna_b_nc_component.definition = grna_b_nc_cd.persistentIdentity;

// Assign components to component definitions
mkate_gene_cd.addComponent(mkate_pconst_component);
mkate_gene_cd.addComponent(mkate_mkate_cds_component);
cas9m_bfp_gene_cd.addComponent(cas9m_bfp_pconst_component);
cas9m_bfp_gene_cd.addComponent(cas9m_bfp_cas9m_bfp_cds_component);
gal4vp16_gene_cd.addComponent(gal4vp16_pconst_component);
gal4vp16_gene_cd.addComponent(gal4vp16_gal4vp16_cds_component);
eyfp_gene_cd.addComponent(eyfp_eyfp_cds_component);
eyfp_gene_cd.addComponent(eyfp_crp_b_component);
grna_b_gene_cd.addComponent(grna_b_grna_b_terminator_component);
grna_b_gene_cd.addComponent(grna_b_cra_u6_component);
grna_b_gene_cd.addComponent(grna_b_grna_b_nc_component);

// Create sequence constraints
let cas9m_bfp_gene_constraint_sequence_constraint = document.sequenceConstraint(createUri(uriPrefix, "cas9m_BFP_gene/cas9m_BFP_gene_constraint", version));
let grna_b_gene_constraint1_sequence_constraint = document.sequenceConstraint(createUri(uriPrefix, "gRNA_b_gene/gRNA_b_gene_constraint1", version));
let grna_b_gene_constraint2_sequence_constraint = document.sequenceConstraint(createUri(uriPrefix, "gRNA_b_gene/gRNA_b_gene_constraint2", version));
let mkate_gene_constraint_sequence_constraint = document.sequenceConstraint(createUri(uriPrefix, "mKate_gene/mKate_gene_constraint", version));
let gal4vp16_gene_constraint_sequence_constraint = document.sequenceConstraint(createUri(uriPrefix, "Gal4VP16_gene/GAL4VP16_gene_constraint", version));
let eyfp_gene_constraint_sequence_constraint = document.sequenceConstraint(createUri(uriPrefix, "EYFP_gene/EYFP_gene_constraint", version));

// Set sequence constraint displayIds
cas9m_bfp_gene_constraint_sequence_constraint.displayId = "cas9m_BFP_gene_constraint";
grna_b_gene_constraint1_sequence_constraint.displayId = "gRNA_b_gene_constraint1";
grna_b_gene_constraint2_sequence_constraint.displayId = "gRNA_b_gene_constraint2";
mkate_gene_constraint_sequence_constraint.displayId = "mKate_gene_constraint";
gal4vp16_gene_constraint_sequence_constraint.displayId = "GAL4VP16_gene_constraint";
eyfp_gene_constraint_sequence_constraint.displayId = "EYFP_gene_constraint";

// set sequence constraint persistent identities
cas9m_bfp_gene_constraint_sequence_constraint.persistentIdentity = createUri(uriPrefix, "cas9m_BFP_gene/cas9m_BFP_gene_constraint");
grna_b_gene_constraint1_sequence_constraint.persistentIdentity = createUri(uriPrefix, "gRNA_b_gene/gRNA_b_gene_constraint1");
grna_b_gene_constraint2_sequence_constraint.persistentIdentity = createUri(uriPrefix, "gRNA_b_gene/gRNA_b_gene_constraint2");
mkate_gene_constraint_sequence_constraint.persistentIdentity = createUri(uriPrefix, "mKate_gene/mKate_gene_constraint");
gal4vp16_gene_constraint_sequence_constraint.persistentIdentity = createUri(uriPrefix, "Gal4VP16_gene/GAL4VP16_gene_constraint");
eyfp_gene_constraint_sequence_constraint.persistentIdentity = createUri(uriPrefix, "EYFP_gene/EYFP_gene_constraint");

// Set sequence constraint versions
cas9m_bfp_gene_constraint_sequence_constraint.version = version;
grna_b_gene_constraint1_sequence_constraint.version = version;
grna_b_gene_constraint2_sequence_constraint.version = version;
mkate_gene_constraint_sequence_constraint.version = version;
gal4vp16_gene_constraint_sequence_constraint.version = version;
eyfp_gene_constraint_sequence_constraint.version = version;

// Set sequence constraint restriction types
cas9m_bfp_gene_constraint_sequence_constraint.restriction = "http://sbols.org/v2#precedes"; 
grna_b_gene_constraint1_sequence_constraint.restriction = "http://sbols.org/v2#precedes"; 
grna_b_gene_constraint2_sequence_constraint.restriction = "http://sbols.org/v2#precedes"; 
mkate_gene_constraint_sequence_constraint.restriction = "http://sbols.org/v2#precedes"; 
gal4vp16_gene_constraint_sequence_constraint.restriction = "http://sbols.org/v2#precedes"; 
eyfp_gene_constraint_sequence_constraint.restriction = "http://sbols.org/v2#precedes"; 

// Connect sequence constraints to their subjects and objects
cas9m_bfp_gene_constraint_sequence_constraint.subject = cas9m_bfp_pconst_component;
cas9m_bfp_gene_constraint_sequence_constraint.object = cas9m_bfp_cas9m_bfp_cds_component;
grna_b_gene_constraint1_sequence_constraint.subject = grna_b_cra_u6_component;
grna_b_gene_constraint1_sequence_constraint.object = grna_b_grna_b_nc_component;
grna_b_gene_constraint2_sequence_constraint.subject = grna_b_grna_b_nc_component;
grna_b_gene_constraint2_sequence_constraint.object = grna_b_grna_b_terminator_component;
mkate_gene_constraint_sequence_constraint.subject = mkate_pconst_component;
mkate_gene_constraint_sequence_constraint.object = mkate_mkate_cds_component;
gal4vp16_gene_constraint_sequence_constraint.subject = gal4vp16_pconst_component;
gal4vp16_gene_constraint_sequence_constraint.object = gal4vp16_gal4vp16_cds_component;
eyfp_gene_constraint_sequence_constraint.subject = eyfp_crp_b_component;
eyfp_gene_constraint_sequence_constraint.object = eyfp_eyfp_cds_component;

// Add sequence constraints to the proper component definitions
cas9m_bfp_gene_cd.addSequenceConstraint(cas9m_bfp_gene_constraint_sequence_constraint);
grna_b_gene_cd.addSequenceConstraint(grna_b_gene_constraint1_sequence_constraint);
grna_b_gene_cd.addSequenceConstraint(grna_b_gene_constraint2_sequence_constraint);
mkate_gene_cd.addSequenceConstraint(mkate_gene_constraint_sequence_constraint);
gal4vp16_gene_cd.addSequenceConstraint(gal4vp16_gene_constraint_sequence_constraint);
eyfp_gene_cd.addSequenceConstraint(eyfp_gene_constraint_sequence_constraint);

// Create characterization module definition
let crpb_circuit = document.moduleDefinition(createUri(uriPrefix, "CRPb_characterization_circuit", version));

// Set characterization circuit displayId
crpb_circuit.displayId = "CRPb_characterization_circuit";

// Set characterization circuit persistentIdentity
crpb_circuit.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit");

// Set characterization circuit version
crpb_circuit.version = version;

let gRNA_b_gene_fc = document.functionalComponent(createUri(uriPrefix, "CRPb_characterization_circuit/gRNA_b_gene", version));
let cas9m_BFP_gene_fc = document.functionalComponent(createUri(uriPrefix, "CRPb_characterization_circuit/cas9m_BFP_gene", version));
let gRNA_b_fc = document.functionalComponent(createUri(uriPrefix, "CRPb_characterization_circuit/gRNA_b", version));
let EYFP_fc = document.functionalComponent(createUri(uriPrefix, "CRPb_characterization_circuit/EYFP", version));
let Gal4VP16_gene_fc = document.functionalComponent(createUri(uriPrefix, "CRPb_characterization_circuit/Gal4VP16_gene", version));
let Gal4VP16_fc = document.functionalComponent(createUri(uriPrefix, "CRPb_characterization_circuit/Gal4VP16", version));
let EYFP_gene_fc = document.functionalComponent(createUri(uriPrefix, "CRPb_characterization_circuit/EYFP_gene", version));
let cas9m_BFP_fc = document.functionalComponent(createUri(uriPrefix, "CRPb_characterization_circuit/cas9m_BFP", version));
let mKate_gene_fc = document.functionalComponent(createUri(uriPrefix, "CRPb_characterization_circuit/mKate_gene", version));
let mKate_fc = document.functionalComponent(createUri(uriPrefix, "CRPb_characterization_circuit/mKate", version));
let cas9m_BFP_gRNA_b_fc = document.functionalComponent(createUri(uriPrefix, "CRPb_characterization_circuit/cas9m_BFP_gRNA_b", version));

gRNA_b_gene_fc.displayId = "gRNA_b_gene";
cas9m_BFP_gene_fc.displayId = "cas9m_BFP_gene";
gRNA_b_fc.displayId = "gRNA_b";
EYFP_fc.displayId = "EYFP";
Gal4VP16_gene_fc.displayId = "Gal4VP16_gene";
Gal4VP16_fc.displayId = "Gal4VP16";
EYFP_gene_fc.displayId = "EYFP_gene";
cas9m_BFP_fc.displayId = "cas9m_BFP";
mKate_gene_fc.displayId = "mKate_gene";
mKate_fc.displayId = "mKate";
cas9m_BFP_gRNA_b_fc.displayId = "cas9m_BFP_gRNA_b";

gRNA_b_gene_fc.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/gRNA_b_gene");
cas9m_BFP_gene_fc.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/cas9m_BFP_gene");
gRNA_b_fc.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/gRNA_b");
EYFP_fc.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/EYFP");
Gal4VP16_gene_fc.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/Gal4VP16_gene");
Gal4VP16_fc.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/Gal4VP16");
EYFP_gene_fc.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/EYFP_gene");
cas9m_BFP_fc.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/cas9m_BFP");
mKate_gene_fc.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/mKate_gene");
mKate_fc.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/mKate");
cas9m_BFP_gRNA_b_fc.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/cas9m_BFP_gRNA_b");

gRNA_b_gene_fc.version = version;
cas9m_BFP_gene_fc.version = version;
gRNA_b_fc.version = version;
EYFP_fc.version = version;
Gal4VP16_gene_fc.version = version;
Gal4VP16_fc.version = version;
EYFP_gene_fc.version = version;
cas9m_BFP_fc.version = version;
mKate_gene_fc.version = version;
mKate_fc.version = version;
cas9m_BFP_gRNA_b_fc.version = version;

gRNA_b_gene_fc.definition = grna_b_gene_cd;
cas9m_BFP_gene_fc.definition = cas9m_bfp_gene_cd;
gRNA_b_fc.definition = grna_b_cd;
EYFP_fc.definition = eyfp_cd;
Gal4VP16_gene_fc.definition = gal4vp16_gene_cd;
Gal4VP16_fc.definition = gal4vp16_cd;
EYFP_gene_fc.definition = eyfp_gene_cd;
cas9m_BFP_fc.definition = cas9m_bfp_cd;
mKate_gene_fc.definition = mkate_gene_cd;
mKate_fc.definition = mkate_cd;
cas9m_BFP_gRNA_b_fc.definition = cas9m_bfp_grna_b_cd;

gRNA_b_gene_fc.direction = "http://sbols.org/v2#none"
cas9m_BFP_gene_fc.direction = "http://sbols.org/v2#none"
gRNA_b_fc.direction = "http://sbols.org/v2#none"
EYFP_fc.direction = "http://sbols.org/v2#none"
Gal4VP16_gene_fc.direction = "http://sbols.org/v2#none"
Gal4VP16_fc.direction = "http://sbols.org/v2#none"
EYFP_gene_fc.direction = "http://sbols.org/v2#none"
cas9m_BFP_fc.direction = "http://sbols.org/v2#none"
mKate_gene_fc.direction = "http://sbols.org/v2#none"
mKate_fc.direction = "http://sbols.org/v2#none"
cas9m_BFP_gRNA_b_fc.direction = "http://sbols.org/v2#none"

gRNA_b_gene_fc.access = "http://sbols.org/v2#private"
cas9m_BFP_gene_fc.access = "http://sbols.org/v2#private"
gRNA_b_fc.access = "http://sbols.org/v2#private"
EYFP_fc.access = "http://sbols.org/v2#private"
Gal4VP16_gene_fc.access = "http://sbols.org/v2#private"
Gal4VP16_fc.access = "http://sbols.org/v2#private"
EYFP_gene_fc.access = "http://sbols.org/v2#private"
cas9m_BFP_fc.access = "http://sbols.org/v2#private"
mKate_gene_fc.access = "http://sbols.org/v2#private"
mKate_fc.access = "http://sbols.org/v2#private"
cas9m_BFP_gRNA_b_fc.access = "http://sbols.org/v2#private"

crpb_circuit.addFunctionalComponent(gRNA_b_gene_fc);
crpb_circuit.addFunctionalComponent(cas9m_BFP_gene_fc);
crpb_circuit.addFunctionalComponent(gRNA_b_fc);
crpb_circuit.addFunctionalComponent(EYFP_fc);
crpb_circuit.addFunctionalComponent(Gal4VP16_gene_fc);
crpb_circuit.addFunctionalComponent(Gal4VP16_fc);
crpb_circuit.addFunctionalComponent(EYFP_gene_fc);
crpb_circuit.addFunctionalComponent(cas9m_BFP_fc);
crpb_circuit.addFunctionalComponent(mKate_gene_fc);
crpb_circuit.addFunctionalComponent(mKate_fc);
crpb_circuit.addFunctionalComponent(cas9m_BFP_gRNA_b_fc);

let mKate_production_interaction = document.interaction(createUri(uriPrefix, "CRPb_characterization_circuit/mKate_production", version));
let Gal4VP16_production_interaction = document.interaction(createUri(uriPrefix, "CRPb_characterization_circuit/Gal4VP16_production", version));
let cas9m_BFP_production_interaction = document.interaction(createUri(uriPrefix, "CRPb_characterization_circuit/cas9m_BFP_production", version));
let gRNA_b_production_interaction = document.interaction(createUri(uriPrefix, "CRPb_characterization_circuit/gRNA_b_production", version));
let EYFP_activation_interaction = document.interaction(createUri(uriPrefix, "CRPb_characterization_circuit/EYFP_Activation", version));
let mKate_deg_interaction = document.interaction(createUri(uriPrefix, "CRPb_characterization_circuit/mKate_deg", version));
let GAL4VP16_deg_interaction = document.interaction(createUri(uriPrefix, "CRPb_characterization_circuit/Gal4VP16_deg", version));
let cas9m_BFP_deg_interaction = document.interaction(createUri(uriPrefix, "CRPb_characterization_circuit/cas9m_BFP_deg", version));
let gRNA_b_deg_interaction = document.interaction(createUri(uriPrefix, "CRPb_characterization_circuit/gRNA_b_deg", version));
let EYFP_deg_interaction = document.interaction(createUri(uriPrefix, "CRPb_characterization_circuit/EYFP_deg", version));
let cas9m_BFP_gRNA_b_deg_interaction = document.interaction(createUri(uriPrefix, "CRPb_characterization_circuit/cas9m_BFP_gRNA_b_deg", version));

mKate_production_interaction.displayId = "mKate_production";
Gal4VP16_production_interaction.displayId = "Gal4VP16_production";
cas9m_BFP_production_interaction.displayId = "cas9m_BFP_production";
gRNA_b_production_interaction.displayId = "gRNA_b_production";
EYFP_activation_interaction.displayId = "EYFP_Activation";
mKate_deg_interaction.displayId = "mKate_deg";
GAL4VP16_deg_interaction.displayId = "Gal4VP16_deg";
cas9m_BFP_deg_interaction.displayId = "cas9m_BFP_deg";
gRNA_b_deg_interaction.displayId = "gRNA_b_deg";
EYFP_deg_interaction.displayId = "EYFP_deg";
cas9m_BFP_gRNA_b_deg_interaction.displayId = "cas9m_BFP_gRNA_b_deg";

mKate_production_interaction.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/mKate_production");
Gal4VP16_production_interaction.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/Gal4VP16_production");
cas9m_BFP_production_interaction.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/cas9m_BFP_production");
gRNA_b_production_interaction.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/gRNA_b_production");
EYFP_activation_interaction.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/EYFP_Activation");
mKate_deg_interaction.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/mKate_deg");
GAL4VP16_deg_interaction.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/Gal4VP16_deg");
cas9m_BFP_deg_interaction.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/cas9m_BFP_deg");
gRNA_b_deg_interaction.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/gRNA_b_deg");
EYFP_deg_interaction.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/EYFP_deg");
cas9m_BFP_gRNA_b_deg_interaction.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/cas9m_BFP_gRNA_b_deg");

mKate_production_interaction.version = version;
Gal4VP16_production_interaction.version = version;
cas9m_BFP_production_interaction.version = version;
gRNA_b_production_interaction.version = version;
EYFP_activation_interaction.version = version;
mKate_deg_interaction.version = version;
GAL4VP16_deg_interaction.version = version;
cas9m_BFP_deg_interaction.version = version;
gRNA_b_deg_interaction.version = version;
EYFP_deg_interaction.version = version;
cas9m_BFP_gRNA_b_deg_interaction.version = version;

mKate_production_interaction.addType(sbo.GENETIC_PRODUCTION);
Gal4VP16_production_interaction.addType(sbo.GENETIC_PRODUCTION);
cas9m_BFP_production_interaction.addType(sbo.GENETIC_PRODUCTION);
gRNA_b_production_interaction.addType(sbo.GENETIC_PRODUCTION);
EYFP_activation_interaction.addType(sbo.STIMULATION);
mKate_deg_interaction.addType(sbo.DEGRADATION);
GAL4VP16_deg_interaction.addType(sbo.DEGRADATION);
cas9m_BFP_deg_interaction.addType(sbo.DEGRADATION);
gRNA_b_deg_interaction.addType(sbo.DEGRADATION);
EYFP_deg_interaction.addType(sbo.DEGRADATION);
cas9m_BFP_gRNA_b_deg_interaction.addType(sbo.DEGRADATION);

let mKate_gene_participation = document.participation(createUri(uriPrefix, "CRPb_characterization_circuit/mKate_production/mKate_gene", version));
let mKate_participation = document.participation(createUri(uriPrefix, "CRPb_characterization_circuit/mKate_production/mKate", version));
let Gal4VP16_gene_participation = document.participation(createUri(uriPrefix, "CRPb_characterization_circuit/Gal4VP16_production/Gal4VP16_gene", version));
let Gal4VP16_participation = document.participation(createUri(uriPrefix, "CRPb_characterization_circuit/Gal4VP16_production/Gal4VP16", version));
let cas9m_BFP_gene_participation = document.participation(createUri(uriPrefix, "CRPb_characterization_circuit/cas9m_BFP_production/cas9m_BFP_gene", version));
let cas9m_BFP_participation = document.participation(createUri(uriPrefix, "CRPb_characterization_circuit/cas9m_BFP_production/cas9m_BFP", version));
let gRNA_b_gene_participation = document.participation(createUri(uriPrefix, "CRPb_characterization_circuit/gRNA_b_production/gRNA_b_gene", version));
let gRNA_b_participation = document.participation(createUri(uriPrefix, "CRPb_characterization_circuit/gRNA_b_production/gRNA_b", version));
let EYFP_gene_participation = document.participation(createUri(uriPrefix, "CRPb_characterization_circuit/EYFP_Activation/EYFP_gene", version));
let Gal4VP16_participation_1 = document.participation(createUri(uriPrefix, "CRPb_characterization_circuit/EYFP_Activation/Gal4VP16", version));
let mKate_participation_1 = document.participation(createUri(uriPrefix, "CRPb_characterization_circuit/mKate_deg/mKate", version));
let Gal4VP16_participation_2 = document.participation(createUri(uriPrefix, "CRPb_characterization_circuit/Gal4VP16_deg/Gal4VP16", version));
let cas9m_BFP_participation_1 = document.participation(createUri(uriPrefix, "CRPb_characterization_circuit/cas9m_BFP_deg/cas9m_BFP", version));
let gRNA_b_participation_1 = document.participation(createUri(uriPrefix, "CRPb_characterization_circuit/gRNA_b_deg/gRNA_b", version));
let EYFP_participation = document.participation(createUri(uriPrefix, "CRPb_characterization_circuit/EYFP_deg/EYFP", version));
let cas9m_BFP_gRNA_b_participation = document.participation(createUri(uriPrefix, "CRPb_characterization_circuit/cas9m_BFP_gRNA_b_deg/cas9m_BFP_gRNA_b", version));

mKate_gene_participation.displayId = "mKate_gene";
mKate_participation.displayId = "mKate";
Gal4VP16_gene_participation.displayId ="Gal4VP16_gene";
Gal4VP16_participation.displayId = "Gal4VP16";
cas9m_BFP_gene_participation.displayId = "cas9m_BFP_gene";
cas9m_BFP_participation.displayId = "cas9m_BFP";
gRNA_b_gene_participation.displayId = "gRNA_b_gene";
gRNA_b_participation.displayId = "gRNA_b";
EYFP_gene_participation.displayId = "EYFP_gene";
Gal4VP16_participation_1.displayId = "Gal4VP16";
mKate_participation_1.displayId = "mKate";
Gal4VP16_participation_2.displayId = "Gal4VP16";
cas9m_BFP_participation_1.displayId = "cas9m_BFP";
gRNA_b_participation_1.displayId = "gRNA_b";
EYFP_participation.displayId = "EYFP";
cas9m_BFP_gRNA_b_participation.displayId = "cas9m_BFP_gRNA_b";

mKate_gene_participation.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/mKate_production/mKate_gene");
mKate_participation.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/mKate_production/mKate");
Gal4VP16_gene_participation.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/Gal4VP16_production/Gal4VP16_gene");
Gal4VP16_participation.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/Gal4VP16_production/Gal4VP16");
cas9m_BFP_gene_participation.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/cas9m_BFP_production/cas9m_BFP_gene");
cas9m_BFP_participation.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/cas9m_BFP_production/cas9m_BFP");
gRNA_b_gene_participation.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/gRNA_b_production/gRNA_b_gene");
gRNA_b_participation.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/gRNA_b_production/gRNA_b");
EYFP_gene_participation.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/EYFP_Activation/EYFP_gene");
Gal4VP16_participation_1.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/EYFP_Activation/Gal4VP16");
mKate_participation_1.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/mKate_deg/mKate");
Gal4VP16_participation_2.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/Gal4VP16_deg/Gal4VP16");
cas9m_BFP_participation_1.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/cas9m_BFP_deg/cas9m_BFP");
gRNA_b_participation_1.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/gRNA_b_deg/gRNA_b");
EYFP_participation.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/EYFP_deg/EYFP");
cas9m_BFP_gRNA_b_participation.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/cas9m_BFP_gRNA_b_deg/cas9m_BFP_gRNA_b");

mKate_gene_participation.version = version;
mKate_participation.version = version;
Gal4VP16_gene_participation.version = version;
Gal4VP16_participation.version = version;
cas9m_BFP_gene_participation.version = version;
cas9m_BFP_participation.version = version;
gRNA_b_gene_participation.version = version;
gRNA_b_participation.version = version;
EYFP_gene_participation.version = version;
Gal4VP16_participation_1.version = version;
mKate_participation_1.version = version;
Gal4VP16_participation_2.version = version;
cas9m_BFP_participation_1.version = version;
gRNA_b_participation_1.version = version;
EYFP_participation.version = version;
cas9m_BFP_gRNA_b_participation.version = version;

mKate_gene_participation.addRole(sbo.PROMOTER);
mKate_participation.addRole(sbo.PRODUCT);
Gal4VP16_gene_participation.addRole(sbo.PROMOTER);
Gal4VP16_participation.addRole(sbo.PRODUCT);
cas9m_BFP_gene_participation.addRole(sbo.PROMOTER);
cas9m_BFP_participation.addRole(sbo.PRODUCT);
gRNA_b_gene_participation.addRole(sbo.PROMOTER);
gRNA_b_participation.addRole(sbo.PRODUCT);
EYFP_gene_participation.addRole(sbo.PROMOTER);
Gal4VP16_participation_1.addRole(sbo.STIMULATOR);
mKate_participation_1.addRole(sbo.REACTANT);
Gal4VP16_participation_2.addRole(sbo.REACTANT);
cas9m_BFP_participation_1.addRole(sbo.REACTANT);
gRNA_b_participation_1.addRole(sbo.REACTANT);
EYFP_participation.addRole(sbo.REACTANT);
cas9m_BFP_gRNA_b_participation.addRole(sbo.REACTANT);

mKate_gene_participation.participant = mKate_gene_fc;
mKate_participation.participant = mKate_fc;
Gal4VP16_gene_participation.participant = Gal4VP16_gene_fc;
Gal4VP16_participation.participant = Gal4VP16_fc;
cas9m_BFP_gene_participation.participant = cas9m_BFP_gene_fc;
cas9m_BFP_participation.participant = cas9m_BFP_fc;
gRNA_b_gene_participation.participant = gRNA_b_gene_fc;
gRNA_b_participation.participant = gRNA_b_fc;
EYFP_gene_participation.participant = EYFP_gene_fc;
Gal4VP16_participation_1.participant = Gal4VP16_fc;
mKate_participation_1.participant = mKate_fc;
Gal4VP16_participation_2.participant = Gal4VP16_fc;
cas9m_BFP_participation_1.participant = cas9m_BFP_fc;
gRNA_b_participation_1.participant = gRNA_b_fc; 
EYFP_participation.participant = EYFP_fc;
cas9m_BFP_gRNA_b_participation.participant = cas9m_BFP_gRNA_b_fc;

mKate_production_interaction.addParticipation(mKate_gene_participation);
mKate_production_interaction.addParticipation(mKate_participation);
Gal4VP16_production_interaction.addParticipation(Gal4VP16_gene_participation);
Gal4VP16_production_interaction.addParticipation(Gal4VP16_participation);
cas9m_BFP_production_interaction.addParticipation(cas9m_BFP_gene_participation);
cas9m_BFP_production_interaction.addParticipation(cas9m_BFP_participation);
gRNA_b_production_interaction.addParticipation(gRNA_b_gene_participation);
gRNA_b_production_interaction.addParticipation(gRNA_b_participation);
EYFP_activation_interaction.addParticipation(EYFP_gene_participation);
EYFP_activation_interaction.addParticipation(Gal4VP16_participation_1);
mKate_deg_interaction.addParticipation(mKate_participation_1);
GAL4VP16_deg_interaction.addParticipation(Gal4VP16_participation_2);
cas9m_BFP_deg_interaction.addParticipation(cas9m_BFP_participation_1);
gRNA_b_deg_interaction.addParticipation(gRNA_b_participation_1);
EYFP_deg_interaction.addParticipation(EYFP_participation);
cas9m_BFP_gRNA_b_deg_interaction.addParticipation(cas9m_BFP_gRNA_b_participation);

crpb_circuit.addInteraction(mKate_production_interaction);
crpb_circuit.addInteraction(mKate_production_interaction);
crpb_circuit.addInteraction(Gal4VP16_production_interaction);
crpb_circuit.addInteraction(cas9m_BFP_production_interaction);
crpb_circuit.addInteraction(cas9m_BFP_production_interaction);
crpb_circuit.addInteraction(gRNA_b_production_interaction);
crpb_circuit.addInteraction(gRNA_b_production_interaction);
crpb_circuit.addInteraction(EYFP_activation_interaction);
crpb_circuit.addInteraction(EYFP_activation_interaction);
crpb_circuit.addInteraction(mKate_deg_interaction);
crpb_circuit.addInteraction(GAL4VP16_deg_interaction);
crpb_circuit.addInteraction(cas9m_BFP_deg_interaction);
crpb_circuit.addInteraction(gRNA_b_deg_interaction);
crpb_circuit.addInteraction(EYFP_deg_interaction);
crpb_circuit.addInteraction(cas9m_BFP_gRNA_b_deg_interaction);

let characterization_template_module = document.module(createUri(uriPrefix, "CRPb_characterization_circuit/CRISPR_Template", version));

characterization_template_module.displayId = "CRISPR_Template";

characterization_template_module.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/CRISPR_Template");

characterization_template_module.version = version;

characterization_template_module.definition = crispr_template_module;

crpb_circuit.addModule(characterization_template_module);

let cas9_mapsto = document.mapping(createUri(uriPrefix, "CRPb_characterization_circuit/CRISPR_Template/cas9m_BFP_gRNA_map", version));
let eyfp_mapsto = document.mapping(createUri(uriPrefix, "CRPb_characterization_circuit/CRISPR_Template/EYFP_map", version));
let grna_b_mapsto = document.mapping(createUri(uriPrefix, "CRPb_characterization_circuit/CRISPR_Template/gRNA_b_map", version));
let cas9m_bfp_mapsto = document.mapping(createUri(uriPrefix, "CRPb_characterization_circuit/CRISPR_Template/cas9m_BFP_map", version));
let eyfp_gene_mapsto = document.mapping(createUri(uriPrefix, "CRPb_characterization_circuit/CRISPR_Template/EYFP_gene_map", version));

cas9_mapsto.displayId = "cas9m_BFP_gRNA_map";
eyfp_mapsto.displayId = "EYFP_map";
grna_b_mapsto.displayId = "gRNA_b_map";
cas9m_bfp_mapsto.displayId = "cas9m_BFP_map";
eyfp_gene_mapsto.displayId = "EYFP_gene_map";

cas9_mapsto.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/CRISPR_Template/cas9m_BFP_gRNA_map");
eyfp_mapsto.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/CRISPR_Template/EYFP_map");
grna_b_mapsto.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/CRISPR_Template/gRNA_b_map");
cas9m_bfp_mapsto.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/CRISPR_Template/cas9m_BFP_map");
eyfp_gene_mapsto.persistentIdentity = createUri(uriPrefix, "CRPb_characterization_circuit/CRISPR_Template/EYFP_gene_map");

cas9_mapsto.version = version;
eyfp_mapsto.version = version;
grna_b_mapsto.version = version;
cas9m_bfp_mapsto.version = version;
eyfp_gene_mapsto.version = version;

cas9_mapsto.remote = cas9_grna_complex_fc;
eyfp_mapsto.remote = target_fc;
grna_b_mapsto.remote = grna_generic_fc;
cas9m_bfp_mapsto.remote = cas9_generic_fc;
eyfp_gene_mapsto.remote = target_gene_fc;

cas9_mapsto.local = cas9m_BFP_gRNA_b_fc;
eyfp_mapsto.local = EYFP_fc;
grna_b_mapsto.local = gRNA_b_fc;
cas9m_bfp_mapsto.local = cas9m_BFP_fc;
eyfp_gene_mapsto.local = EYFP_gene_fc;

cas9_mapsto.refinement = "http://sbols.org/v2#useLocal";
eyfp_mapsto.refinement = "http://sbols.org/v2#useLocal";
grna_b_mapsto.refinement = "http://sbols.org/v2#useLocal";
cas9m_bfp_mapsto.refinement = "http://sbols.org/v2#useLocal";
eyfp_gene_mapsto.refinement = "http://sbols.org/v2#useLocal";

characterization_template_module.addMapping(cas9_mapsto);
characterization_template_module.addMapping(eyfp_mapsto);
characterization_template_module.addMapping(grna_b_mapsto);
characterization_template_module.addMapping(cas9m_bfp_mapsto);
characterization_template_module.addMapping(eyfp_gene_mapsto);


// Serialize the result
let xml = document.serializeXML();

filesystem.writeFile('RepressionModel-js.rdf', xml);
