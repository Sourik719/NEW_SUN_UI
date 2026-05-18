const sizeClasses = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-[3px]',
    lg: 'h-12 w-12 border-4',
};

const Spinner = ({ size = 'sm' }) => (
    <span className="relative inline-flex">
        <span className={`${sizeClasses[size]} rounded-full border-current/20`} />
        <span className={`${sizeClasses[size]} absolute inset-0 animate-spin rounded-full border-transparent border-t-current`} />
    </span>
);

const Loader = ({ fullPage = false, label = 'Loading', size = 'sm' }) => {
    if (fullPage) {
        return (
            <div className="flex min-h-[55vh] items-center justify-center px-5 py-16 text-orange-600" role="status" aria-live="polite">
                <div className="flex flex-col items-center gap-4">
                    <div className="rounded-full bg-orange-50 p-4 shadow-sm ring-1 ring-orange-100">
                        <Spinner size="lg" />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-wide text-slate-600">{label}</p>
                </div>
            </div>
        );
    }

    return (
        <span className="inline-flex h-6 items-center justify-center align-middle" role="status" aria-live="polite" aria-label={label}>
            <Spinner size={size} />
        </span>
    );
};

export default Loader
