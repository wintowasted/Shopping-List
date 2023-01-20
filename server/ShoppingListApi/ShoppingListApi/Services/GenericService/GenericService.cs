using Microsoft.EntityFrameworkCore.Query;
using ShoppingListApi.Models.EfCore;
using System.Linq.Expressions;

namespace ShoppingListApi.Services.GenericService
{
    public class GenericService<T> : IGenericService<T> where T : class
    {
        private readonly ShoppingListContext _context;

        public GenericService(ShoppingListContext context)
        {
            _context = context;
        }

        protected DbSet<T> Table { get => _context.Set<T>(); }

        public async Task<DataResult> AddAsync(T entity)
        {
            try
            {
                await Table.AddAsync(entity);
                await _context.SaveChangesAsync();
                return new DataResult(true, "");
            }
            catch (Exception ex)
            {
                return new DataResult(false, ex.Message);
            }
        }

        public async Task<DataResult> DeleteAsync(T entity)
        {
            try
            {
                Table.Remove(entity);
                await _context.SaveChangesAsync();
                return new DataResult(true, "");
            }
            catch (Exception ex)
            {
                return new DataResult(false, ex.Message);
            }
        }

        public async Task<List<T>> GetAllAsync()
        {
            try
            {
                return await Table.ToListAsync();
            }
            catch (Exception)
            {   
                return new List<T>();   
            }
        }

        public async Task<List<T>> GetAllAsync(Expression<Func<T, object>> predicate)
        {
            try
            {
                return await Table.Include(predicate).ToListAsync();
            }
            catch (Exception)
            {
                return new List<T>();
            }
        }

        public async Task<T> GetByIdAsync(int id)
        {
            try
            {
                return await Table.FindAsync(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate)
        {
            try
            {
                var query = Table.AsQueryable();
                return await query.Where(predicate).Take(1).FirstOrDefaultAsync();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<DataResult> UpdateAsync(T entity)
        {
            try
            {
                Table.Attach(entity);
                _context.Entry(entity).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return new DataResult(true, "");
            }
            catch (Exception ex)
            {
                return new DataResult(false, ex.Message);
            }
        }

        public async Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate,
                                                  Expression<Func<T, object>> includeProperty)
        {   
            return await Table.Where(predicate)
                .Include(includeProperty)
                .FirstOrDefaultAsync();

        }

        public async Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate, Func<IQueryable<T>, IIncludableQueryable<T, object>> include)
        {
            var query = Table.AsQueryable();
            query = include(query);
            return await query.FirstOrDefaultAsync(predicate);
        }

        public async Task<List<T>> GetAllAsync(Expression<Func<T, bool>> predicate, Func<IQueryable<T>, IIncludableQueryable<T, object>> include)
        {
            var query = Table.AsQueryable();
            query = query.Where(predicate);
            query = include(query);
            return await query.ToListAsync();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
