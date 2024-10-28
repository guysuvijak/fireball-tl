'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface QueueItem {
    name: string;
    reputation: number;
    character: string;
    note?: string;
}

interface ItemDrop {
    name: string;
    queues: QueueItem[];
}

interface Boss {
    id: number;
    name: string;
    items: ItemDrop[];
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const bosses: Boss[] = [
    {
        id: 1,
        name: "Morokai",
        items: [
            {
                name: "Morokai's Greatblade of Corruption",
                queues: []
            },
            {
                name: "Arcane Shadow Gloves",
                queues: []
            },
            {
                name: "Abyssal Grace Pendant",
                queues: []
            }
        ]
    },
    {
        id: 2,
        name: "Excavator-9",
        items: [
            {
                name: "Excavator's Mysterious Scepter",
                queues: []
            },
            {
                name: "Heroic Breeches of the Resistance",
                queues: []
            },
            {
                name: "Embossed Granite Band",
                queues: []
            }
        ]
    },
    {
        id: 3,
        name: "Chernobog",
        items: [
            {
                name: "Chernobog's Blade of Beheading",
                queues: [
                    {
                        character: "STREK",
                        reputation: 6951,
                        name: "Chernobog's Blade of Beheading"
                    },
                    {
                        character: "DeeJub",
                        reputation: 4191,
                        name: "Chernobog's Blade of Beheading"
                    },
                    {
                        character: "RasPK",
                        reputation: 850,
                        name: "Chernobog's Blade of Beheading"
                    }
                ]
            },
            {
                name: "Helm of the Field General",
                queues: [
                    {
                        character: "BR13",
                        reputation: 4929,
                        name: "Helm of the Field General"
                    }
                ]
            },
            {
                name: "Arcane Shadow Shoes",
                queues: []
            },
            {
                name: "Bile Drenched Veil",
                queues: []
            }
        ]
    },
    {
        id: 4,
        name: "Talus",
        items: [
            {
                name: "Talus's Crystalline Staff",
                queues: [
                    {
                        character: "PunkTalk",
                        reputation: 6027,
                        name: "Talus's Crystalline Staff"
                    }
                ]
            },
            {
                name: "Phantom Wolf Mask",
                queues: [
                    {
                        character: "B3nZury",
                        reputation: 37745,
                        name: "Phantom Wolf Mask"
                    },
                    {
                        character: "PaoQ",
                        reputation: 7797,
                        name: "Phantom Wolf Mask"
                    }
                ]
            },
            {
                name: "Blessed Templar Plate Mail",
                queues: []
            },
            {
                name: "Forged Golden Bangle",
                queues: []
            }
        ]
    },
    {
        id: 5,
        name: "Malakar",
        items: [
            {
                name: "Malakar's Energizing Crossbows",
                queues: []
            },
            {
                name: "Shock Commander Visor",
                queues: [
                    {
                        character: "Penzilgon",
                        reputation: 49435,
                        name: "Shock Commander Visor"
                    }
                ]
            },
            {
                name: "Ebon Roar Gauntlets",
                queues: []
            },
            {
                name: "Gilded Infernal Wristlet",
                queues: []
            }
        ]
    },
    {
        id: 6,
        name: "Cornelius",
        items: [
            {
                name: "Cornelius's Animated Edge",
                queues: []
            },
            {
                name: "Ascended Guardian Hood",
                queues: []
            },
            {
                name: "Divine Justiciar Attire",
                queues: []
            },
            {
                name: "Abyssal Grace Charm",
                queues: []
            }
        ]
    },
    {
        id: 7,
        name: "Ahzreil",
        items: [
            {
                name: "Ahzreil's Siphoning Sword",
                queues: []
            },
            {
                name: "Swirling Essence Pants",
                queues: []
            },
            {
                name: "Divine Justiciar Pants",
                queues: []
            },
            {
                name: "Blessed Templar Cloak",
                queues: []
            }
        ]
    },
    {
        id: 8,
        name: "Minzerok",
        items: [
            {
                name: "Minzerok's Daggers of Crippling",
                queues: []
            },
            {
                name: "Swirling Essence Hat",
                queues: []
            },
            {
                name: "Divine Justiciar Gloves",
                queues: []
            },
            {
                name: "Blessed Templar Choker",
                queues: []
            }
        ]
    },
    {
        id: 9,
        name: "Kowazan",
        items: [
            {
                name: "Kowazan's Twilight Daggers",
                queues: []
            },
            {
                name: "Shock Commander Greaves",
                queues: []
            },
            {
                name: "Arcane Shadow Hat",
                queues: []
            },
            {
                name: "Collar of Decimation",
                queues: []
            }
        ]
    },
    {
        id: 10,
        name: "Adentus",
        items: [
            {
                name: "Adentus' Gargantuan Greatsword",
                queues: [
                    {
                        character: "Deehom",
                        reputation: 4616,
                        name: "Adentus' Gargantuan Greatsword"
                    }
                ]
            },
            {
                name: "Shadow Harvester Mask",
                queues: [
                    {
                        character: "Kypriz",
                        reputation: 25020,
                        name: "Shadow Harvester Mask"
                    },
                    {
                        character: "KareeRagnar",
                        reputation: 13585,
                        name: "Shadow Harvester Mask"
                    },
                    {
                        character: "LanaNewerth",
                        reputation: 25382,
                        name: "Shadow Harvester Mask",
                        note: "ต่อคิวใหม่"
                    }
                ]
            },
            {
                name: "Blessed Templar Helmet",
                queues: []
            },
            {
                name: "Girdle of Spectral Skulls",
                queues: [
                    {
                        character: "RaggaeWiz",
                        reputation: 6311,
                        name: "Girdle of Spectral Skulls"
                    }
                ]
            }
        ]
    },
    {
        id: 11,
        name: "Junobote",
        items: [
            {
                name: "Junobote's Juggernaut Warblade",
                queues: []
            },
            {
                name: "Shadow Harvester Trousers",
                queues: []
            },
            {
                name: "Arcane Shadow Robes",
                queues: []
            },
            {
                name: "Forsaken Embrace",
                queues: []
            }
        ]
    },
    {
        id: 12,
        name: "Grand Aelon",
        items: [
            {
                name: "Aelon's Rejuvenating Longbow",
                queues: []
            },
            {
                name: "Greaves of the Field General",
                queues: [
                    {
                        character: "Teegagutee",
                        reputation: 12176,
                        name: "Greaves of the Field General"
                    }
                ]
            },
            {
                name: "Arcane Shadow Pants",
                queues: []
            },
            {
                name: "Wrapped Coin Necklace",
                queues: []
            }
        ]
    },
    {
        id: 13,
        name: "Nirma",
        items: [
            {
                name: "Nirma's Sword of Echoes",
                queues: []
            },
            {
                name: "Ascended Guardian Pants",
                queues: []
            },
            {
                name: "Divine Justiciar Shoes",
                queues: []
            },
            {
                name: "Clasp of the Overlord",
                queues: [
                    {
                        character: "UraHala",
                        reputation: 16099,
                        name: "Clasp of the Overlord"
                    }
                ]
            }
        ]
    },
    {
        id: 14,
        name: "Aridus",
        items: [
            {
                name: "Aridus's Gnarled Voidstaff",
                queues: []
            },
            {
                name: "Phantom Wolf Breeches",
                queues: [
                    {
                        character: "Marshiez",
                        reputation: 22595,
                        name: "Phantom Wolf Breeches"
                    }
                ]
            },
            {
                name: "Boots of the Executioner",
                queues: []
            },
            {
                name: "Belt of Bloodlust",
                queues: []
            }
        ]
    },
];

export default function BossQueue() {
    const [ expandedBoss, setExpandedBoss ] = useState<number | null>(null);

    const toggleBoss = (bossId: number) => {
        setExpandedBoss(expandedBoss === bossId ? null : bossId);
    };

    const getTotalQueues = (bosses: Boss[]): number => {
        return bosses.reduce((total, boss) => {
            const bossQueues = boss.items.reduce((itemTotal, item) => {
                return itemTotal + item.queues.length;
            }, 0);
            return total + bossQueues;
        }, 0);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-[calc(100vh-64px)] flex flex-col" // ปรับความสูงตาม navbar
        >
            {/* Header */}
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-white flex items-baseline gap-3">
                    คิวของบอสกิลด์
                    <span className="text-lg text-gray-400">
                        (ลงคิวแล้ว {getTotalQueues(bosses)} คน)
                    </span>
                </h1>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 min-h-0 mb-5"> {/* min-h-0 สำคัญมากสำหรับ flex container */}
                <div className="container mx-auto px-4 h-full">
                    <div className="h-full overflow-auto">
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-6"
                        >
                            {bosses.map((boss) => (
                                <motion.div
                                    key={boss.id}
                                    variants={item}
                                    className="bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-800/90 transition-colors"
                                    layout
                                >
                                    <motion.button
                                        className="w-full"
                                        onClick={() => toggleBoss(boss.id)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="relative w-full h-[62px]">
                                            <Image
                                                src={`/assets/boss/${boss.name.toLowerCase().replace(' ', '-')}-banner.webp`}
                                                alt={boss.name}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                                            <div className="absolute bottom-2 left-4 right-4 flex justify-between items-center">
                                                <span className="text-white font-semibold">
                                                    {boss.id}. {boss.name}
                                                </span>
                                                <div className="flex items-center">
                                                    {boss.items.some(item => item.queues.length > 0) && (
                                                        <span className="px-2 py-0.5 text-xs rounded-full bg-orange-500/20 text-orange-400">
                                                            {boss.items.reduce((total, item) => total + item.queues.length, 0)} คิว
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.button>

                                    <motion.div
                                        initial={false}
                                        animate={{ height: expandedBoss === boss.id ? "auto" : 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-4 space-y-4">
                                        {boss.items.map((item, idx) => (
                                            <div key={idx} className="space-y-2">
                                                <div className="flex gap-4 items-start">
                                                    <div className="relative w-[50px] h-[50px] flex-shrink-0 bg-gradient-to-b from-[#21172a] via-[#311f3c] to-[#643e7b] border-2 border-[#ae8b7b]">
                                                        <Image
                                                            src={`/assets/boss-items/${boss.id}-${idx}.png`}
                                                            alt={item.name}
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-blue-400 font-medium">
                                                            {item.name}
                                                            {item.queues.length > 0 && (
                                                                <span className="ml-2 text-sm text-orange-400">
                                                                    ({item.queues.length} คิว)
                                                                </span>
                                                            )}
                                                        </h3>
                                                        {item.queues.length > 0 ? (
                                                            <div className="space-y-1 pl-4 border-l-2 border-gray-700 mt-2">
                                                                {item.queues.map((queue, qIdx) => (
                                                                    <div
                                                                        key={qIdx}
                                                                        className="text-sm text-gray-300 flex justify-between items-center"
                                                                    >
                                                                        <span className="font-medium">
                                                                            {queue.character}
                                                                        </span>
                                                                        <span>
                                                                            <span className="text-gray-400">
                                                                                ({queue.reputation.toLocaleString()})
                                                                            </span>
                                                                            {queue.note && (
                                                                                <span className="ml-2 text-red-400">{queue.note}</span>
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div className="text-sm text-gray-500 pl-4 mt-2">ไม่มีคิว</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}