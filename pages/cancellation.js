import Container from '@/components/ui/Container';

const Cancellations = () => {
    return (
        <Container className="bg-stone-50 px-5 py-16 sm:px-8">
            <main className="mx-auto max-w-3xl rounded-md border border-stone-200 bg-white p-8 text-center shadow-sm">
                <p className="text-sm font-bold uppercase tracking-wide text-orange-600">Policy</p>
                <h1 className="mt-3 text-4xl font-extrabold text-slate-950">No cancellations or refunds available</h1>
                <p className="mt-5 text-lg leading-8 text-slate-700">Please review donation or contribution details carefully before completing payment.</p>
            </main>
        </Container>
    );
};

export default Cancellations;
