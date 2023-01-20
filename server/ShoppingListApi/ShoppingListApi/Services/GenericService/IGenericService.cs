using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace ShoppingListApi.Services.GenericService
{
    public interface IGenericService<T> where T : class
    {
        public Task<List<T>> GetAllAsync();
        public Task<List<T>> GetAllAsync(Expression<Func<T, object>> predicate);
        public Task<List<T>> GetAllAsync(Expression<Func<T, bool>> predicate, Func<IQueryable<T>, IIncludableQueryable<T, object>> include);
        public Task<T> GetByIdAsync(int id);
        public Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate);
        public Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate, Expression<Func<T, object>> includeProperty);
        public Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate, Func<IQueryable<T>, IIncludableQueryable<T, object>> include);
        public Task<DataResult> AddAsync(T entity);
        public Task<DataResult> UpdateAsync(T entity);
        public Task<DataResult> DeleteAsync(T entity);
        public Task<int> SaveChangesAsync();
     
    }
}
