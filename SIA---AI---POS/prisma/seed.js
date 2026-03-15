const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Database...');

    // Delete existing records to avoid duplicates when re-seeding
    await prisma.transactionItem.deleteMany({});
    await prisma.transaction.deleteMany({});
    await prisma.horse.deleteMany({});

    const horses = [
        {
            name: 'Kuda Arab (Purebred)',
            price: 75000000,
            category: 'Premium',
            image: '/images/horses/arabian_horse.png',
            certId: 'SY-AR-2024-001',
            vaccines: JSON.stringify(['AIE (Jan 2024)', 'Influenza (Dec 2023)']),
            health: 'Sangat Sehat (Grade A)',
            origin: 'Arab Saudi',
            note: 'Telah diaudit kemurnian nasabnya.'
        },
        {
            name: 'Kuda Pony (Schooling)',
            price: 25000000,
            category: 'Edukasi',
            image: '/images/horses/pony_horse.png',
            certId: 'SY-PN-2024-012',
            vaccines: JSON.stringify(['Tetanus (Feb 2024)']),
            health: 'Sehat (Grade B)',
            origin: 'Sumbawa',
            note: 'Cocok untuk latihan berkuda anak-anak Syariah.'
        },
        {
            name: 'Kuda Sandelwood',
            price: 45000000,
            category: 'Lokal Unggul',
            image: '/images/horses/sandelwood_horse.png',
            certId: 'SY-SW-2024-045',
            vaccines: JSON.stringify(['Influenza (Jan 2024)', 'Rabies (Nov 2023)']),
            health: 'Sangat Sehat (Grade A)',
            origin: 'Sumba',
            note: 'Turunan unggul, lari sangat cepat dan stabil.'
        },
        {
            name: 'Kuda Akhal-Teke',
            price: 120000000,
            category: 'Premium/Koleksi',
            image: '/images/horses/akhal_teke_horse.png',
            certId: 'SY-AK-2024-009',
            vaccines: JSON.stringify(['AIE (Mar 2024)', 'West Nile (Jan 2024)']),
            health: 'Sangat Sehat (Grade A+)',
            origin: 'Turkmenistan',
            note: 'Kuda dengan bulu berkilau metalik, sangat langka.'
        },
        {
            name: 'Kuda Friesian',
            price: 95000000,
            category: 'Elegan',
            image: '/images/horses/friesian_horse.png',
            certId: 'SY-FR-2024-022',
            vaccines: JSON.stringify(['AIE (Feb 2024)', 'Tetanus (Dec 2023)']),
            health: 'Sangat Sehat (Grade A)',
            origin: 'Belanda',
            note: 'Kuda hitam gagah dengan bulu kaki yang indah.'
        },
        {
            name: 'Kuda Marwari',
            price: 65000000,
            category: 'Unik',
            image: '/images/horses/marwari_horse.png',
            certId: 'SY-MR-2024-033',
            vaccines: JSON.stringify(['Influenza (Feb 2024)', 'Rabies (Jan 2024)']),
            health: 'Sangat Sehat (Grade A)',
            origin: 'India',
            note: 'Ciri khas telinga yang melengkung ke dalam.'
        },
        {
            name: 'Kuda Morgan',
            price: 55000000,
            category: 'Serbaguna',
            image: 'https://images.unsplash.com/photo-1551884831-bbf3cdc67390?auto=format&fit=crop&q=80&w=800',
            certId: 'SY-MG-2024-015',
            vaccines: JSON.stringify(['AIE (Jan 2024)', 'Rabies (Feb 2024)']),
            health: 'Sehat (Grade B+)',
            origin: 'Amerika',
            note: 'Kuda yang sangat patuh dan ramah.'
        },
        {
            name: 'Kuda Thoroughbred',
            price: 85000000,
            category: 'Balap',
            image: 'https://images.unsplash.com/photo-1553285991-4c74211f509e?auto=format&fit=crop&q=80&w=800',
            certId: 'SY-TB-2024-067',
            vaccines: JSON.stringify(['Influenza (Mar 2024)', 'AIE (Dec 2023)']),
            health: 'Atletis (Grade A)',
            origin: 'Inggris',
            note: 'Sangat cepat, cocok untuk olahraga berkuda.'
        },
        {
            name: 'Kuda Clydesdale',
            price: 110000000,
            category: 'Pekerja/Besar',
            image: 'https://images.unsplash.com/photo-1616262333256-6548483b5443?auto=format&fit=crop&q=80&w=800',
            certId: 'SY-CL-2024-004',
            vaccines: JSON.stringify(['Tetanus (Jan 2024)', 'AIE (Feb 2024)']),
            health: 'Kuat (Grade A)',
            origin: 'Skotlandia',
            note: 'Ukuran raksasa, sangat tenang dan bertenaga.'
        },
        {
            name: 'Kuda Appaloosa',
            price: 40000000,
            category: 'Eksotis',
            image: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&q=80&w=800',
            certId: 'SY-AP-2024-088',
            vaccines: JSON.stringify(['Influenza (Feb 2024)', 'Rabies (Dec 2023)']),
            health: 'Sehat (Grade B+)',
            origin: 'Amerika',
            note: 'Pola bintik unik seperti macan tutul.'
        }
    ];

    for (const horse of horses) {
        await prisma.horse.create({
            data: horse
        });
    }

    console.log('Database successfully seeded with 10 horses.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
