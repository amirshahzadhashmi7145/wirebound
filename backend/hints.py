def get_maximum_hints(grid_size):
    if grid_size > 8:
        return 3
    else:
        return grid_size // 2  # Example logic for smaller grids
