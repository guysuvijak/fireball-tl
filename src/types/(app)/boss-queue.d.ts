interface BossQueueItemProps {
    character: string;
    note?: string;
    date: string;
};

interface BossItemDropProps {
    id: string;
    name: string;
    queues: BossQueueItemProps[];
};

export interface BossQueueProps {
    id: number;
    name: string;
    items: BossItemDropProps[];
};