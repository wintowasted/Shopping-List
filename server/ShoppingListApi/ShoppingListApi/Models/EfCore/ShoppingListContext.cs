using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ShoppingListApi.Models.EfCore;

public partial class ShoppingListContext : DbContext
{
    public ShoppingListContext()
    {
    }

    public ShoppingListContext(DbContextOptions<ShoppingListContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<List> Lists { get; set; }

    public virtual DbSet<ListsProduct> ListsProducts { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<User> Users { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK_Category");

            entity.Property(e => e.CategoryName).HasMaxLength(50);
        });

        modelBuilder.Entity<List>(entity =>
        {
            entity.Property(e => e.ListName).HasMaxLength(50);

            entity.HasOne(d => d.User).WithMany(p => p.Lists)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Lists_Users");
        });

        modelBuilder.Entity<ListsProduct>(entity =>
        {
            entity.HasKey(e => new { e.ListId, e.ProductId });

            entity.Property(e => e.Description)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.List).WithMany(p => p.ListsProducts)
                .HasForeignKey(d => d.ListId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_ListsProducts_Lists");

            entity.HasOne(d => d.Product).WithMany(p => p.ListsProducts)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_ListsProducts_Products");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK_Product");

            entity.Property(e => e.ProductName).HasMaxLength(50);

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Product_Category");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.UserName).HasMaxLength(50);
            entity.Property(e => e.UserRole).HasMaxLength(50);
            
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
