import React, { useState } from 'react';
import { FileRow, ColumnMapping } from '../../types/FileTypes';

interface FileMappingProps {
    data: FileRow[];
    onMappingChange: (mapping: { tableConfig?: TableConfig }) => void;
}

interface TableConfig {
    name: string;
    columns: ColumnMapping[];
}

interface ValidationMessage {
    column: string;
    type: 'error' | 'warning';
}
const TABLE_CONFIGS: TableConfig[] = [
    {
        name: 'Data Center',
        columns: [
            { id: 'nomCourtDatacenter', name: 'nomCourtDatacenter', displayName: 'Nom Court Datacenter', required: true },
            { id: 'nomLongDatacenter', name: 'nomLongDatacenter', displayName: 'Nom Long Datacenter' },
            { id: 'pue', name: 'pue', displayName: 'PUE' },
            { id: 'localisation', name: 'localisation', displayName: 'Localisation', required: true },
            { id: 'nomEntite', name: 'nomEntite', displayName: 'Nom Entité' },
            { id: 'qualite', name: 'qualite', displayName: 'Qualité' }
        ]
    },
    {
        name: 'Equipements Physiques',
        columns: [
            { id: 'nomEquipementPhysique', name: 'nomEquipementPhysique', displayName: 'Nom Équipement Physique', required: true },
            { id: 'modele', name: 'modele', displayName: 'Modèle', required: true },
            { id: 'quantite', name: 'quantite', displayName: 'Quantité', required: true },
            { id: 'nomCourtDatacenter', name: 'nomCourtDatacenter', displayName: 'Nom Court Datacenter' },
            { id: 'dateAchat', name: 'dateAchat', displayName: 'Date Achat' },
            { id: 'dateRetrait', name: 'dateRetrait', displayName: 'Date Retrait' },
            { id: 'dureeUsageInterne', name: 'dureeUsageInterne', displayName: 'Durée Usage Interne' },
            { id: 'dureeUsageAmont', name: 'dureeUsageAmont', displayName: 'Durée Usage Amont' },
            { id: 'dureeUsageAval', name: 'dureeUsageAval', displayName: 'Durée Usage Aval' },
            { id: 'type', name: 'type', displayName: 'Type', required: true },
            { id: 'statut', name: 'statut', displayName: 'Statut' },
            { id: 'paysDUtilisation', name: 'paysDUtilisation', displayName: 'Pays D\'Utilisation', required: true },
            { id: 'consoElecAnnuelle', name: 'consoElecAnnuelle', displayName: 'Conso Elec Annuelle' },
            { id: 'utilisateur', name: 'utilisateur', displayName: 'Utilisateur' },
            { id: 'nomSourceDonnee', name: 'nomSourceDonnee', displayName: 'Nom Source Donnée' },
            { id: 'nomEntite', name: 'nomEntite', displayName: 'Nom Entité' },
            { id: 'nbCoeur', name: 'nbCoeur', displayName: 'Nb Coeur' },
            { id: 'nbJourUtiliseAn', name: 'nbJourUtiliseAn', displayName: 'Nb Jour Utilisé An' },
            { id: 'goTelecharge', name: 'goTelecharge', displayName: 'GO Téléchargé' },
            { id: 'modeUtilisation', name: 'modeUtilisation', displayName: 'Mode Utilisation' },
            { id: 'tauxUtilisation', name: 'tauxUtilisation', displayName: 'Taux Utilisation' },
            { id: 'qualite', name: 'qualite', displayName: 'Qualité' }
        ]
    },
    {
        name: 'Equipements Virtuels',
        columns: [
            { id: 'nomEquipementVirtuel', name: 'nomEquipementVirtuel', displayName: 'Nom Équipement Virtuel', required: true },
            { id: 'nomEquipementPhysique', name: 'nomEquipementPhysique', displayName: 'Nom Équipement Physique', required: true },
            { id: 'nomSourceDonneeEquipementPhysique', name: 'nomSourceDonneeEquipementPhysique', displayName: 'Nom Source Donnée Équipement Physique' },
            { id: 'cleRepartition', name: 'cleRepartition', displayName: 'Clé Répartition' },
            { id: 'vCPU', name: 'vCPU', displayName: 'vCPU' },
            { id: 'cluster', name: 'cluster', displayName: 'Cluster' },
            { id: 'consoElecAnnuelle', name: 'consoElecAnnuelle', displayName: 'Conso Elec Annuelle' },
            { id: 'typeEqv', name: 'typeEqv', displayName: 'Type EQV', required: true },
            { id: 'capaciteStockage', name: 'capaciteStockage', displayName: 'Capacité Stockage' },
            { id: 'nomEntite', name: 'nomEntite', displayName: 'Nom Entité' },
            { id: 'qualite', name: 'qualite', displayName: 'Qualité' }
        ]
    },
    {
        name: 'Applications',
        columns: [
            { id: 'nomApplication', name: 'nomApplication', displayName: 'Nom Application', required: true },
            { id: 'typeEnvironnement', name: 'typeEnvironnement', displayName: 'Type Environnement', required: true },
            { id: 'nomEquipementVirtuel', name: 'nomEquipementVirtuel', displayName: 'Nom Équipement Virtuel', required: true },
            { id: 'nomSourceEquipementVirtuel', name: 'nomSourceEquipementVirtuel', displayName: 'Nom Source Équipement Virtuel' },
            { id: 'domaine', name: 'domaine', displayName: 'Domaine' },
            { id: 'sousDomaine', name: 'sousDomaine', displayName: 'Sous Domaine' },
            { id: 'nomEntite', name: 'nomEntite', displayName: 'Nom Entité' },
            { id: 'nomEquipementPhysique', name: 'nomEquipementPhysique', displayName: 'Nom Équipement Physique' },
            { id: 'nomSourceDonnee', name: 'nomSourceDonnee', displayName: 'Nom Source Donnée' },
            { id: 'qualite', name: 'qualite', displayName: 'Qualité' }
        ]
    },
    {
        name: 'Opération non IT',
        columns: [
            { id: 'nomItemNonIT', name: 'nomItemNonIT', displayName: 'Nom Item Non IT' },
            { id: 'quantite', name: 'quantite', displayName: 'Quantité' },
            { id: 'type', name: 'type', displayName: 'Type' },
            { id: 'dureeDeVie', name: 'dureeDeVie', displayName: 'Durée De Vie' },
            { id: 'localisation', name: 'localisation', displayName: 'Localisation' },
            { id: 'nomEntite', name: 'nomEntite', displayName: 'Nom Entité' },
            { id: 'nomSourceDonnee', name: 'nomSourceDonnee', displayName: 'Nom Source Donnée' },
            { id: 'nomCourtDatacenter', name: 'nomCourtDatacenter', displayName: 'Nom Court Datacenter' },
            { id: 'description', name: 'description', displayName: 'Description' },
            { id: 'consoElecAnnuelle', name: 'consoElecAnnuelle', displayName: 'Conso Elec Annuelle' },
            { id: 'qualite', name: 'qualite', displayName: 'Qualité' }
        ]
    },
    {
        name: 'Messagerie',
        columns: [
            { id: 'nomEntite', name: 'nomEntite', displayName: 'Nom Entité' },
            { id: 'nbCollaborateurs', name: 'nbCollaborateurs', displayName: 'Nb Collaborateurs' },
            { id: 'responsableEntite', name: 'responsableEntite', displayName: 'Responsable Entité' },
            { id: 'responsableNumeriqueResponsable', name: 'responsableNumeriqueResponsable', displayName: 'Responsable Numérique Responsable' }
        ]
    },
    {
        name: 'Pays',
        columns: [
            { id: 'Nom', name: 'Nom', displayName: 'Nom', required: true },
        ]
    }
];

const FileMapping: React.FC<FileMappingProps> = ({ data, onMappingChange }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [validationMessages, setValidationMessages] = useState<ValidationMessage[]>([]);

    const handleTabChange = (index: number) => {
        setActiveTab(index);
        onMappingChange({ tableConfig: TABLE_CONFIGS[index] });
    };

    const validateMapping = () => {
        const messages: ValidationMessage[] = [];
        const columns = TABLE_CONFIGS[activeTab].columns;

        columns.forEach(column => {
            if (!data.some(row => row[column.id])) {
                messages.push({
                    column: column.displayName,
                    type: column.required ? 'error' : 'warning'
                });
            }
        });

        setValidationMessages(messages);
        return !messages.some(msg => msg.type === 'error');
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

            {validationMessages.length > 0 && (
                <div className="validation-messages">
                    {validationMessages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message ${msg.type}`}
                            style={{
                                color: msg.type === 'error' ? '#ff0000' : '#ffa500',
                                backgroundColor: msg.type === 'error' ? 'rgba(255,0,0,0.1)' : 'rgba(255,165,0,0.1)',
                                padding: '8px',
                                margin: '4px 0',
                                borderRadius: '4px'
                            }}
                        >
                            {msg.type === 'error' ?
                                `Colonne requise manquante : ${msg.column}` :
                                `Colonne facultative manquante : ${msg.column}`}
                        </div>
                    ))}
                </div>
            )}

            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        {TABLE_CONFIGS[activeTab].columns.map(column => (
                            <th key={column.id}>
                                <div className="column-header">
                                    {column.displayName}
                                    {column.required && <span style={{ color: '#ff0000' }}> *</span>}
                                </div>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.slice(0, 100).map((row, rowIndex) => (
                        <tr key={row.id || rowIndex}>
                            {TABLE_CONFIGS[activeTab].columns.map(column => (
                                <td key={`${row.id}-${column.id}`}>
                                    {row[column.id] || ''}
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