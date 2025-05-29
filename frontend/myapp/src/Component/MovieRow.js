function MovieRow({handleDelete,handleDislike,handleLike,data}) {
    return (
        <>
            <div className="container py-4">
                <div className="row g-4">
                    {data.map((item) => (
                        <div className="col-sm-6 col-lg-12" key={item.id}>
                            <div className="card shadow-sm h-100" style={{ maxWidth: "940px", margin: "auto" }}>
                                <div className="row g-0 align-items-center">
                                    <div className="col-md-4">
                                        <img
                                            src={item.image_url}
                                            className="img-fluid rounded-start"
                                            alt={item.title}
                                            style={{ width: "100%", height: "200px", padding: "10px" }}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body d-flex flex-column h-100">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p className="card-text text-muted mb-1">{item.duration}</p>
                                            <p className="card-text flex-grow-1">{item.description}</p>
                                            <p className="card-text">
                                                <small className="text-muted">Last updated 3 mins ago</small>
                                            </p>
                                            <div className="d-flex align-items-center mt-auto">
                                                <button
                                                    className="btn btn-primary btn-sm me-2"
                                                    onClick={() => handleLike(item.id)}
                                                >
                                                    Like
                                                </button>
                                                <span className="fw-bold">{item.likeCount}</span>
                                                <button
                                                    className="btn btn-outline-danger btn-sm ms-3"
                                                    onClick={() => handleDislike(item.id)}
                                                >
                                                    Dislike
                                                </button>
                                                <button onClick={() => handleDelete(item.id)}
                                                >DELETE</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default MovieRow;