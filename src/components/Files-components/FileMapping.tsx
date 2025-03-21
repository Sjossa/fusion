import React, { useState } from 'react';
import { FileRow } from '../../types/FileTypes';

interface FileMappingProps {
    data: FileRow[];
    onMappingChange: (mapping: { tableConfig?: TableConfig }) => void;
}

interface TableConfig {
    name: string;
    columns: string[];
}

const TABLE_CONFIGS: TableConfig[] = [
    {
        name: 'Data Center',
        columns: ['nomCourtDatacenter', 'nomLongDatacenter', 'pue', 'localisation', 'nomEntite', 'qualite']
    },
    {
        name: 'Equipements Physiques',
        columns: ['nomEquipementPhysique', 'modele', 'quantite', 'nomCourtDatacenter', 'dateAchat', 'dateRetrait',
            'dureeUsageInterne', 'dureeUsageAmont', 'dureeUsageAval', 'type', 'statut', 'paysDUtilisation',
            'consoElecAnnuelle', 'utilisateur', 'nomSourceDonnee', 'nomEntite', 'nbCoeur', 'nbJourUtiliseAn',
            'goTelecharge', 'modeUtilisation', 'tauxUtilisation', 'qualite']
    },
    {
        name: 'Equipements Virtuels',
        columns: ['nomEquipementVirtuel', 'nomEquipementPhysique', 'nomSourceDonneeEquipementPhysique',
            'cleRepartition', 'vCPU', 'cluster', 'consoElecAnnuelle', 'typeEqv', 'capaciteStockage',
            'nomEntite', 'qualite']
    },
    {
        name: 'Applications',
        columns: ['nomApplication', 'typeEnvironnement', 'nomEquipementVirtuel', 'nomSourceEquipementVirtuel',
            'domaine', 'sousDomaine', 'nomEntite', 'nomEquipementPhysique', 'nomSourceDonnee', 'qualite']
    },
    {
        name: 'Opération non IT',
        columns: ['nomItemNonIT', 'quantite', 'type', 'dureeDeVie', 'localisation', 'nomEntite', 'nomSourceDonnee',
            'nomCourtDatacenter', 'description', 'consoElecAnnuelle', 'qualite']
    },
    {
        name: 'Messagerie',
        columns: ['nomEntite', 'nbCollaborateurs', 'responsableEntite', 'responsableNumeriqueResponsable']
    },
    {
        name: 'Pays',
        columns: ['Nom']
    }
];

const FileMapping: React.FC<FileMappingProps> = ({ data, onMappingChange }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [mappingErrors, setMappingErrors] = useState<string[]>([]);

    const handleTabChange = (index: number) => {
        setActiveTab(index);
        onMappingChange({ tableConfig: TABLE_CONFIGS[index] });
    };

    const validateMapping = () => {
        const errors: string[] = [];
        const requiredColumns = TABLE_CONFIGS[activeTab].columns;

        requiredColumns.forEach(column => {
            if (!data.some(row => column in row)) {
                errors.push(`Colonne manquante : ${column}`);
            }
        });

        setMappingErrors(errors);
        return errors.length === 0;
    };

    return (
        <div className="file-mapping">
            <div className="mapping-header">
                <h2>Aperçu des données</h2>
            </div>

            <div className="tabs">
                {TABLE_CONFIGS.map((config, index) => (
                    <button
                        key={index}
                        className={`tab ${activeTab === index ? 'active' : ''}`}
                        onClick={() => handleTabChange(index)}
                    >
                        {config.name}
                    </button>
                ))}
            </div>

            {mappingErrors.length > 0 && (
                <div className="validation-errors">
                    {mappingErrors.map((error, index) => (
                        <div key={index} className="error-message">{error}</div>
                    ))}
                </div>
            )}

            
                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            {TABLE_CONFIGS[activeTab].columns.map(column => (
                                <th key={column}>
                                    <div className="column-header">
                                        {column}
                                    </div>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {data.slice(0, 100).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {TABLE_CONFIGS[activeTab].columns.map(column => (
                                    <td key={column}>
                                        {row[column] || ''}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>


            <div className="mapping-actions">
                <button
                    className="validate-button"
                    onClick={validateMapping}
                >
                    Valider le mapping
                </button>
            </div>
        </div>
    );
};

export default FileMapping;
