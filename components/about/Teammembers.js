
function PositionHolder({ name, position, imageUrl }) {
    return (
        <article className="flex flex-col items-center rounded-md border border-stone-200 bg-stone-50 p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            {imageUrl && (
                <div className="mb-4">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="h-40 w-40 rounded-md object-cover shadow-md" />
                </div>
            )}
            <div>
                <h3 className="mb-1 text-xl font-extrabold text-slate-950">{name}</h3>
                <p className="text-sm font-bold uppercase tracking-wide text-orange-600">{position}</p>
            </div>
        </article>
    );
}

export default PositionHolder;
